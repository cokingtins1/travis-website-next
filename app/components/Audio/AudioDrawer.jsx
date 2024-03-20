"use client"

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import IconButton from "@mui/material/IconButton"
import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import Slider from "@mui/material/Slider"
import { useEffect, useRef, useState } from "react"
import AudioProgressBar from "./AudioProgressBar"
import Tooltip from "@mui/material/Tooltip"
import CloseIcon from "@mui/icons-material/Close"
import { useAudio } from "@/libs/contexts/AudioContext"
import AudioProductSection from "./AudioProductSection"

export default function AudioDrawer({
	audioSrc, //required
	srcType, //required
	audioList = undefined,
	buttonId,
	file = false,
	playOnMount = true,
	product = null,
	startingPrice = null,
	imageSrc = null,
	free = false,
}) {
	const audioRef = useRef(null)
	const [isReady, setIsReady] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currentProgress, setCurrentProgress] = useState(0)
	const [buffered, setBuffered] = useState(0)

	const {
		audioSrcId,
		setAudioSrcId,
		playing,
		setPlaying,
		togglePlayPause,
		getRef,
		drawerOpen,
		setDrawerOpen,
		volume,
		setVolume,
		listLength,
		setListLength,
		currentIndex,
		setCurrentIndex,
	} = useAudio()

	useEffect(() => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration)

			if (!audioList) return

			const currentSong = audioList.find((item) => item.src === audioSrc)
			const currentIndex = currentSong?.index
			setCurrentIndex(currentIndex)
			setListLength(Object.entries(audioList).length)
		}
	}, [])

	useEffect(() => {
		getRef(audioRef)

		if (!playOnMount) return
		audioRef.current?.pause()

		const timeOut = setTimeout(() => {
			audioRef.current?.play()
		}, 500)

		return () => {
			clearTimeout(timeOut)
		}
	}, [audioSrcId])

	const handleNextPrev = (step) => {
		setAudioSrcId(() => {
			if (currentIndex === listLength && step === 1) {
				return audioList.find((item) => item.index === 1).src
			} else if (currentIndex === listLength && step === -1) {
				return audioList.find(
					(item) => item.index === currentIndex + step
				).src
			} else if (currentIndex === 1 && step === -1) {
				return audioList.find((item) => item.index === listLength).src
			} else {
				return audioList.find(
					(item) => item.index === currentIndex + step
				).src
			}
		})

		setCurrentIndex((prev) => {
			if (currentIndex === listLength && step === 1) {
				return 1
			} else if (currentIndex === listLength && step === -1) {
				prev + step
			} else if (currentIndex === 1 && step === -1) {
				return listLength
			} else {
				return prev + step
			}
		})
	}

	const closePlayer = () => {
		togglePlayPause(audioSrc)
		setDrawerOpen(false)
		setPlaying(false)
		setAudioSrcId(null)
		getRef(null)
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
				className={`${
					file || "fixed left-0 bottom-0"
				} w-full bg-bg-elevated transition-transform duration-300 ease-in-out z-50 ${
					drawerOpen ? "translate-y-0" : "translate-y-full"
				} `}
				style={{ boxShadow: "0px 0px 25px 0px #64646480" }}
			>
				<audio
					ref={audioRef}
					preload="metadata"
					onDurationChange={(e) =>
						setDuration(e.currentTarget.duration)
					}
					onPlaying={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
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
					loop
				>
					<source type={srcType} src={audioSrc} />
				</audio>
				<div className="flex lg:grid grid-cols-3 justify-items-stretch items-center justify-center my-2 mx-16">
					<AudioProductSection
						imageSrc={imageSrc}
						product={product}
						startingPrice={startingPrice}
						free={free}
					/>
					<div className="justify-self-center">
						<div className="flex items-center justify-center">
							<IconButton
								sx={{ fontSize: "2.5rem" }}
								onClick={() => handleNextPrev(-1)}
								disabled={audioList === undefined}
							>
								<SkipPreviousIcon
									sx={{ color: "#a7a7a7" }}
									fontSize="inherit"
								/>
							</IconButton>
							<IconButton
								sx={{ fontSize: "3rem" }}
								id={audioSrc}
								onClick={() =>
									togglePlayPause(audioSrc, buttonId)
								}
								disabled={audioSrc === false}
							>
								{!playing ? (
									<PlayCircleFilledIcon fontSize="inherit" />
								) : (
									<PauseCircleFilledIcon fontSize="inherit" />
								)}
							</IconButton>
							<IconButton
								sx={{ fontSize: "2.5rem" }}
								onClick={() => handleNextPrev(1)}
								disabled={audioList === undefined}
							>
								<SkipNextIcon
									sx={{ color: "#a7a7a7" }}
									fontSize="inherit"
								/>
							</IconButton>
						</div>
						<div className="hidden sm:text-center h-[30px]">
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
						<div className="block text-center sm:hidden">
							<p className="text-text-secondary text-sm">
								{product?.title}
							</p>
						</div>
					</div>
					<div className="sm:hidden">
						{playOnMount && (
							<div className="absolute top-0 right-4">
								<Tooltip title={"Close Player"} placement="top">
									<IconButton
										onClick={() => closePlayer(audioSrc)}
									>
										<CloseIcon />
									</IconButton>
								</Tooltip>
							</div>
						)}
					</div>
					<div className="hidden lg:flex justify-self-end items-center w-[200px] gap-4 mt-8">
						{playOnMount && (
							<div className="absolute top-0 right-4">
								<Tooltip title={"Close Player"} placement="top">
									<IconButton
										onClick={() => closePlayer(audioSrc)}
									>
										<CloseIcon />
									</IconButton>
								</Tooltip>
							</div>
						)}
						<Tooltip
							title={volume === 0 ? "Unmute" : "Mute"}
							placement="top"
						>
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
