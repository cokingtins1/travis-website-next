"use client"
import Button from "@mui/material/Button"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import PauseIcon from "@mui/icons-material/Pause"
import { useRef, useState } from "react"

export default function PlayAudioButton({
	audioSrc,
	disabled,
	fileType,
	styles = { width: "115px", height: "40px" },
}) {
	const audioRef = useRef(null)
	const [playing, setPlaying] = useState(false)

	function handleClick() {
		if (!playing) {
			setPlaying(true)
			audioRef.current.play()
		} else {
			setPlaying(false)
			audioRef.current.pause()
		}
	}

	return (
		<>
			{audioSrc && fileType !== "application/x-zip-compressed" && (
				<audio
					ref={audioRef}
					className="fixed bottom-16 inset-x-1/2"
					controls
				>
					<source src={audioSrc} type={fileType} />
				</audio>
			)}
			<Button
				component="label"
				variant="contained"
				disabled={disabled}
				startIcon={!playing ? <PlayCircleIcon /> : <PauseIcon />}
				onClick={handleClick}
				sx={styles}
			>
				{playing ? "Pause" : "Play"}
			</Button>
		</>
	)
}
