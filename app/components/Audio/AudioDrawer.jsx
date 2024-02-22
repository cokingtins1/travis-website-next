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

export default function AudioDrawer({
	isOpen,
	product,
	currentSong,
	startingPrice,
	imageSrc,
}) {
	const drawerClasses = isOpen ? "translate-y-0" : "translate-y-full"

	const audioRef = useRef(null)

	const [isReady, setIsReady] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currentProgress, setCurrentProgress] = useState(0)
	const [buffered, setBuffered] = useState(0)
	const [volume, setVolume] = useState(0.2)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration)
		}
	}, [])

	const handleNext = () => {
		onNext()
	}

	const handlePrev = () => {
		onPrev()
	}

	const togglePlayPause = () => {
		if (!isPlaying) {
			setIsPlaying(true)
			audioRef.current?.play()
		} else {
			setIsPlaying(false)
			audioRef.current?.pause()
		}
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

	return (
		<>
			<div
				className={`bottom-drawer fixed left-0 bottom-0 w-full bg-bg-elevated transition-transform ${drawerClasses}`}
			>
				<audio
					ref={audioRef}
					preload="metadata"
					onDurationChange={(e) =>
						setDuration(e.currentTarget.duration)
					}
					onPlaying={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
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
					<source type="audio/mpeg" src={currentSong} />
				</audio>
				<div className="grid grid-cols-2 lg:grid-cols-3 justify-items-stretch items-center justify-center my-2 mx-16">
					<div className="flex justify-self-start gap-4">
						<div className="size-[75px] relative">
							<Image
								src={imageSrc}
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
							<AddToCartBtn
								startingPrice={startingPrice}
								imageSrc={imageSrc}
								product={product}
							/>
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
								onClick={togglePlayPause}
							>
								{!isPlaying ? (
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
						<div className="text-center">
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
						<IconButton onClick={handleMuteUnmute}>
							{volume === 0 ? <VolumeOffIcon /> : <VolumeDown />}
						</IconButton>
						<Slider
							aria-label="Volume"
							min={0}
							step={0.05}
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
