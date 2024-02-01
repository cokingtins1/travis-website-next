"use client"

import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { Button as MyButton } from "@/app/components/UI/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useSupabase } from "@/libs/supabase/supabase-context"
import { useEffect, useState } from "react"

export default function Page() {
	const DummyData = {
		file_MP3: null,
		file_WAV: null,
		file_STEM: null,
		image: null,
		title: "The Coolest Beat Known to Man",
		type: "Beat",
		releaseDate: new Date(),
		description: "This is the description",
		tags: ["cool", "nice", "swag"],
		genres: ["R&B", "Hip Hop", "Rap"],
		moods: ["angry", "moody", "complicated"],
		keys: "BM",
		bpm: 175,
		instruments: ["Drums", "Guitar"],
		price: {
			basic: {
				checked: true,
				price: 30,
			},
			premium: {
				checked: true,
				price: 50,
			},
			exclusive: {
				checked: true,
				price: 250,
			},
		},
	}

	const [data, setData] = useState(DummyData)
	const [fileName, setFileName] = useState("")

	function updateFields(fields) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		let reader = new FileReader()
		let file = e.target.files[0]

		// fetch("/api/upload", {
		// 	method: "POST",
		// 	body: formData,
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		// Handle the response from the server
		// 		console.log(data)
		// 	})
		// 	.catch((error) => {
		// 		// Handle any errors
		// 		console.error(error)
		// 	})
	}

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	})
	return (
		<>
			<div className="flex justify-center items-center">
				<form onSubmit={(e) => handleSubmit(e)}>
					<Button
						component="label"
						variant="contained"
						startIcon={<CloudUploadIcon />}
						sx={{ width: "115px", height: "40px" }}
					>
						Upload
						<VisuallyHiddenInput
							// disabled={uploading}
							type="file"
						/>
					</Button>
					<button
						className="bg-white text-black p-4 rounded"
						type="submit"
					>
						Submit Form
					</button>
				</form>
			</div>
		</>
	)
}
