import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import CachedIcon from "@mui/icons-material/Cached"
import { Button as MyButton } from "@/app/components/UI/Button"

import { useEffect, useState } from "react"

export default function UploadFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	fileSrcProps,
	updateFields,
}) {
	const [file, setFile] = useState(fileProps)
	const [fileName, setFileName] = useState(fileNameProps)
	const [size, setSize] = useState(fileSizeProps)
	const [src, setSrc] = useState(fileSrcProps)

	function handleChange(e) {
		let reader = new FileReader()
		let newFile = e.target.files[0]

		if (newFile) {
			// console.log("newFile.name:", newFile.name, "fileName:", fileName)
			reader.onloadend = () => setFileName(newFile.name)
			reader.readAsDataURL(newFile)
			updateFields({
				MP3_file: newFile,
				MP3_fileName: newFile.name,
				MP3_fileSize: newFile.size,
			})
			// if (newFile.name !== fileName) {
			// }
		}
	}

	// async function handleSubmit(e) {
	// 	e.preventDefault()
	// 	const file = e.target.files[0]
	// 	const fileData = new FormData()
	// 	fileData.set("file", file)

	// 	try {
	// 		const res = await fetch("/api/upload", {
	// 			method: "POST",
	// 			body: fileData,
	// 		})
	// 	} catch (error) {}
	// }

	// useEffect(() => {
	// 	if (file && fileName && src) {
	// 		updateFields({
	// 			fileData: {
	// 				fileName: fileName,
	// 				file: file,
	// 				src: src,
	// 				size: size,
	// 			},
	// 		})
	// 	}
	// }, [fileName, file, src, updateFields])

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
			<div className="flex justify-between items-center rounded-lg border border-border-primary p-2">
				<div className="flex gap-2">
					<span className="flex items-center rounded-full border border-border-primary p-2">
						<MusicNoteIcon sx={{ fontSize: 40 }} />
					</span>
					<div>
						<p className="font-semibold">Un-tagged audio</p>
						<p className="text-sm text-text-secondary">
							{!fileProps ? (
								<span>Upload .mp3 or .wav files only</span>
							) : (
								<span>
									{fileNameProps} &#8226;{" "}
									{Math.round(fileSizeProps * 10e-6)}MB{" "}
								</span>
							)}
						</p>
					</div>
				</div>

				<div className="flex gap-2">
					<Button
						component="label"
						variant="contained"
						disabled={!fileProps}
						startIcon={<PlayCircleIcon />}
						sx={{ width: "115px", height: "40px" }}
					>
						Play
					</Button>

					<Button
						component="label"
						variant="contained"
						startIcon={
							!fileProps ? <CloudUploadIcon /> : <CachedIcon />
						}
						sx={{ width: "115px", height: "40px" }}
					>
						{!fileProps ? "Upload" : "Replace"}
						<VisuallyHiddenInput
							name="file"
							onChange={(e) => {
								// handleSubmit(e)
								handleChange(e)
							}}
							type="file"
						/>
					</Button>
				</div>
			</div>
		</>
	)
}
