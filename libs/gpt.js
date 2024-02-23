// I'm trying to make a smooth transition for the AudioDrawer whenever it opens. It is currently smooth when the IconButton on the ProductImageCard is pressed but I want it to stay open when the same IconButton is pressed again and I want the smooth close transition when the CloseIcon is pressed in the AudioDrawer. 

// ProductCardImage:
"use client"

import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import IconButton from "@mui/material/IconButton"

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"

import AudioDrawer from "../Audio/AudioDrawer"
import { useAudio } from "@/libs/contexts/AudioContext"
import { useEffect, useState } from "react"

export default function ProductCardImage({
	imageSrc,
	audioSrc,
	srcType,
	product,
	startingPrice,
}) {
	const {
		audioSrcId,
		setAudioSrcId,
		playing,
		togglePlayPause,
		drawerOpen,
		setDrawerOpen,
	} = useAudio()

	useEffect(() => {
		setAudioSrcId(null)
	}, [])

	const [pleaseOpen, setPleaseOpen] = useState(false)

	return (
		<>
			<figure className="relative group flex flex-col items-center h-[85px] w-[85px]">
				<Image
					src={imageSrc ? imageSrc : beatKitImage}
					className="rounded-sm"
					fill={true}
					style={{ objectFit: "cover" }}
					sizes="(max-width: 430px), 85px "
					alt="product image"
				/>
				<figcaption className="absolute bottom-0 text-xs bg-bg-secondary rounded p-1">
					{product.bpm} BPM
				</figcaption>
				{audioSrc && (
					<figcaption className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-200">
						<IconButton
							sx={{ fontSize: "3rem" }}
							onClick={() => {
								{
									togglePlayPause(audioSrc)

									setPleaseOpen(!pleaseOpen)
								}
							}}
						>
							{!playing ? (
								<PlayCircleFilledIcon fontSize="inherit" />
							) : (
								<PauseCircleFilledIcon fontSize="inherit" />
							)}
						</IconButton>
					</figcaption>
				)}
			</figure>
			{audioSrc === audioSrcId && (
				<AudioDrawer
					open={pleaseOpen}
					audioSrc={audioSrc}
					srcType={srcType}
					startingPrice={startingPrice}
					product={product}
					imageSrc={imageSrc}
				/>
			)}
		</>
	)
}

//AudioDrawer: 
"use client"

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import IconButton from "@mui/material/IconButton"
import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import Slider from "@mui/material/Slider"
import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import AddToCartBtn from "../UI/AddToCartBtn"
import { useEffect, useRef, useState } from "react"
import AudioProgressBar from "./AudioProgressBar"
import Tooltip from "@mui/material/Tooltip"
import CloseIcon from "@mui/icons-material/Close"
import { useAudio } from "@/libs/contexts/AudioContext"

export default function AudioDrawer({
	open,
	product,
	audioSrc,
	srcType,
	startingPrice,
	imageSrc,
}) {
    
    const audioRef = useRef(null)
	const [isReady, setIsReady] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currentProgress, setCurrentProgress] = useState(0)
	const [buffered, setBuffered] = useState(0)
	const [volume, setVolume] = useState(0.2)
    
	const {
        audioSrcId,
        setAudioSrcId,
		playing,
		setPlaying,
		togglePlayPause,
		getRef,
	} = useAudio()
    
    
	useEffect(() => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration)
		}
	}, [])

	useEffect(() => {
		audioRef.current?.pause()

		const timeOut = setTimeout(() => {
			audioRef.current?.play()
		}, 500)

		getRef(audioRef)

		return () => {
			clearTimeout(timeOut)
		}
	}, [open])

	const handleNext = () => {
		onNext()
	}

	const handlePrev = () => {
		onPrev()
	}

	const closePlayer = () => {
		togglePlayPause()
		setPlaying(false)
		setAudioSrcId(null)
	}

	const handleVolumeChange = (e) => {
		if (!audioRef.current) return
		const volumeValue = e.target.value
		audioRef.current.volume = volumeValue
		setVolume(volumeValue)
	}

	const handleMuteUnmute = () => {
		if (!audioRef.current) return

		if (audioRef.current.volume !== 0) {
			audioRef.current.volume = 0
		} else {
			audioRef.current.volume = 0.3
		}
	}

	const handleBufferProgress = (e) => {
		const audio = e.currentTarget
		const dur = audio.duration
		if (dur > 0) {
			for (let i = 0; i < audio.buffered.length; i++) {
				if (
					audio.buffered.start(audio.buffered.length - 1 - i) <
					audio.currentTime
				) {
					const bufferedLength = audio.buffered.end(
						audio.buffered.length - 1 - i
					)
					setBuffered(bufferedLength)
					break
				}
			}
		}
	}

	function volumeLabelFormat(value) {
		return (value * 100).toFixed()
	}

	return (
		<>
			<div
				className={`bottom-drawer fixed left-0 bottom-0 w-full bg-bg-elevated transition-transform duration-300 ease-in-out ${
					open ? "translate-y-0" : "translate-y-full"
				} `}
			>
				<audio
					ref={audioRef}
					preload="metadata"
					onDurationChange={(e) =>
						setDuration(e.currentTarget.duration)
					}
					onPlaying={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
					onEnded={handleNext}
					onCanPlay={(e) => {
						e.currentTarget.volume = volume
						setIsReady(true)
					}}
					onTimeUpdate={(e) => {
						setCurrentProgress(e.currentTarget.currentTime)
						handleBufferProgress(e)
					}}
					onProgress={handleBufferProgress}
					onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
				>
					<source type={srcType} src={audioSrc} />
				</audio>
				<div className="grid grid-cols-2 lg:grid-cols-3 justify-items-stretch items-center justify-center my-2 mx-16">
					<div className="flex justify-self-start gap-4">
						<div className="size-[75px] relative">
							<Image
								src={imageSrc || beatKitImage}
								fill
								sizes="(max-width: 430px), 75px "
								alt="product image"
							/>
						</div>
						<div>
							<p className="text-sm text-text-primary">
								{product.title}
							</p>
							<p className="text-sm text-text-secondary">
								beatsByTrav
							</p>
						</div>
						<div className="hidden lg:block">
							{startingPrice && (
								<AddToCartBtn
									startingPrice={startingPrice}
									imageSrc={imageSrc}
									product={product}
								/>
							)}
						</div>
					</div>
					<div className="justify-self-center">
						<div className="flex items-center justify-center">
							<IconButton sx={{ fontSize: "2.5rem" }}>
								<SkipPreviousIcon
									sx={{ color: "#a7a7a7" }}
									fontSize="inherit"
								/>
							</IconButton>
							<IconButton
								sx={{ fontSize: "3rem" }}
								onClick={() => togglePlayPause(audioSrc)}
								disabled={audioSrc === false}
							>
								{!playing ? (
									<PlayCircleFilledIcon fontSize="inherit" />
								) : (
									<PauseCircleFilledIcon fontSize="inherit" />
								)}
							</IconButton>
							<IconButton sx={{ fontSize: "2.5rem" }}>
								<SkipNextIcon
									sx={{ color: "#a7a7a7" }}
									fontSize="inherit"
								/>
							</IconButton>
						</div>
						<div className="text-center h-[30px]">
							{!isNaN(duration) && (
								<AudioProgressBar
									duration={duration}
									currentProgress={currentProgress}
									buffered={buffered}
									onChange={(e, value) => {
										if (!audioRef.current) return
										audioRef.current.currentTime = value

										setCurrentProgress(value)
									}}
								/>
							)}
						</div>
					</div>
					<div className="hidden lg:flex justify-self-end items-center w-[200px] gap-4 mt-8">
						<div className="absolute top-0 right-4">
							<Tooltip title={"Close Player"} placement="top">
								<IconButton onClick={closePlayer}>
									<CloseIcon />
								</IconButton>
							</Tooltip>
						</div>
						<Tooltip title={volume === 0 ? "Unmute" : "Mute"}>
							<IconButton onClick={handleMuteUnmute}>
								{volume === 0 ? (
									<VolumeOffIcon />
								) : (
									<VolumeDown />
								)}
							</IconButton>
						</Tooltip>
						<Slider
							aria-label="Volume"
							valueLabelDisplay="auto"
							valueLabelFormat={volumeLabelFormat}
							min={0}
							step={0.01}
							max={1}
							value={volume}
							sx={{ color: "#ffeec2" }}
							onChange={(e) => {
								handleVolumeChange(e)
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

//AudioContext:
"use client"

import React, { createContext, useContext, useState } from "react"

const AudioContext = createContext()

export const AudioContextProvider = ({ children }) => {
	const [audioSrcId, setAudioSrcId] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [ref, setRef] = useState(null)

	const getRef = (ref) => {
		setRef(ref)
	}

	const togglePlayPause = (audioSrc) => {
		if (!audioSrc) return

		if (audioSrc !== audioSrcId || !ref) {
			setAudioSrcId(audioSrc)
			if (!drawerOpen) {
				setDrawerOpen(true)
			}
		}

		setPlaying(!playing)

		if (ref) {
			if (!playing) {
				ref.current?.play()
			} else {
				ref.current?.pause()
			}
		}
	}

	const values = {
		audioSrcId,
		playing,
		drawerOpen,
		setDrawerOpen,
		setAudioSrcId,
		setPlaying,
		togglePlayPause,
		getRef,
	}

	return (
		<AudioContext.Provider value={values}>{children}</AudioContext.Provider>
	)
}

export const useAudio = () => {
	return useContext(AudioContext)
}

