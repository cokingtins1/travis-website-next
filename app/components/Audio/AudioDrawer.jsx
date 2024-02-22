"use client"

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import IconButton from "@mui/material/IconButton"
import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeUp from "@mui/icons-material/VolumeUp"
import Slider from "@mui/material/Slider"
import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import AddToCartBtn from "../UI/AddToCartBtn"
import { useEffect, useRef, useState } from "react"
import { formatDurationDisplay } from "@/libs/utils"

export default function AudioDrawer({ isOpen, product, currentSong }) {
	const drawerClasses = isOpen ? "translate-y-0" : "translate-y-full"

	const audioRef = useRef(null)

	const [isReady, setIsReady] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currrentProgress, setCurrrentProgress] = useState(0)
	const [buffered, setBuffered] = useState(0)
	const [volume, setVolume] = useState(0.2)
	const [isPlaying, setIsPlaying] = useState(false)

	const durationDisplay = formatDurationDisplay(duration)
	const elapsedDisplay = formatDurationDisplay(currrentProgress)

	const handleNext = () => {
		onNext()
	}

	const handlePrev = () => {
		onPrev()
	}

	const togglePlayPause = () => {
		if (isReady) {
			if (isPlaying) {
				audioRef.current?.pause()
				setIsPlaying(false)
			} else {
				audioRef.current?.play()
				setIsPlaying(true)
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
					// onDurationChange={(e) =>
					// 	setDuration(e.currentTarget.duration)
					// }
					onPlaying={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
					onEnded={handleNext}
					onCanPlay={(e) => {
						e.currentTarget.volume = volume
						setIsReady(true)
					}}
					// onTimeUpdate={(e) => {
					// 	setCurrrentProgress(e.currentTarget.currentTime)
					// 	handleBufferProgress(e)
					// }}
					// onProgress={handleBufferProgress}
					onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
				>
					<source type="audio/mpeg" src={currentSong.src} />
				</audio>
				<div className="grid grid-cols-3 justify-items-stretch items-center justify-center p-4">
					<div className="flex justify-self-start gap-4">
						<div className="size-[75px] relative">
							<Image
								src={beatKitImage}
								fill
								sizes="(max-width: 430px), 75px "
								alt="product image"
							/>
						</div>
						<div>
							<p className="text-sm text-text-primary">
								Avec Toi 91 BPM - @1trav x Trevbaj
								(Drake)_Master
							</p>
							<p className="text-sm text-text-secondary">
								beatsByTrav
							</p>
						</div>
						<div>
							<AddToCartBtn startingPrice={30} />
						</div>
					</div>
					<div className="justify-self-center">
						<IconButton style={{ fontSize: "3rem" }}>
							<SkipPreviousIcon fontSize="inherit" />
						</IconButton>
						<IconButton
							style={{ fontSize: "3rem" }}
							onClick={togglePlayPause}
						>
							<PlayCircleFilledIcon fontSize="inherit" />
						</IconButton>
						<IconButton style={{ fontSize: "3rem" }}>
							<SkipNextIcon fontSize="inherit" />
						</IconButton>
					</div>
					<div className="flex justify-self-end items-center w-[200px] gap-4">
						<VolumeDown />
						<Slider
							aria-label="Volume"
							// value={value}
							// onChange={handleChange}
						/>
						<VolumeUp />
					</div>
				</div>
			</div>
		</>
	)
}
