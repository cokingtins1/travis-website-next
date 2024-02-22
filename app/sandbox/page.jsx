"use client"

import { useState } from "react"
import AudioDrawer from "../components/Audio/AudioDrawer"
import Button from "@mui/material/Button"

export default function Page() {

	const [open, setOpen] = useState(false)

	const audio = {
		src:'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
	}

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Play Audio</Button>
			<AudioDrawer isOpen={open} currentSong={audio} />
		</div>
	)
}
