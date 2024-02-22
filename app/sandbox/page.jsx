"use client"

import { useEffect, useRef, useState } from "react"
import AudioDrawer from "../components/Audio/AudioDrawer"
import Button from "@mui/material/Button"
import { getAudioSrcById } from "@/libs/supabase/supabaseQuery"

export default function Page() {
	const [open, setOpen] = useState(false)
	const [audioSrc, setAudioSrc] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const audioData = await getAudioSrcById(
				"0ed14377-2640-4341-b6d8-c3f7a4dcdb64"
			)
			if (audioData) {
				setAudioSrc(audioData)
				console.log(audioSrc)
			}
		}

		fetchData()
	}, [])



	const audio = {
		src: "https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/sign/all_products/4149f3e5-a9b1-4504-873b-653c26eaaf95/c7ee2c21-0ee3-42bd-87b8-ac14487d4c34?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhbGxfcHJvZHVjdHMvNDE0OWYzZTUtYTliMS00NTA0LTg3M2ItNjUzYzI2ZWFhZjk1L2M3ZWUyYzIxLTBlZTMtNDJiZC04N2I4LWFjMTQ0ODdkNGMzNCIsImlhdCI6MTcwODYwNjY5NCwiZXhwIjoxNzA5MjExNDk0fQ.jpnDV3mb_rdDKkMa3wik4xc33wsjCtRnByY03H9D3Gw&t=2024-02-22T12%3A58%3A13.894Z",
	}

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Play Audio</Button>
			
			{audioSrc && (

				<AudioDrawer
					isOpen={open}
					currentSong={audioSrc }
				/>
			)}
		</div>
	)
}
