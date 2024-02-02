import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import CachedIcon from "@mui/icons-material/Cached"
import { Button as MyButton } from "@/app/components/UI/Button"

import { useEffect, useState } from "react"

export default function UploadFile({ fileData, updateFields }) {
	const [file, setFile] = useState(fileData.file)
	const [fileName, setFileName] = useState(fileData.fileName)
	const [size, setSize] = useState(fileData.size)
	const [src, setSrc] = useState(fileData.src)

	function handleChange(e) {
		let reader = new FileReader()
		let newFile = e.target.files[0]

		if (newFile) {
			// console.log("newFile.name:", newFile.name, "fileName:", fileName)
			reader.onloadend = () => setFileName(newFile.name)
			if (newFile.name !== fileName) {
				reader.readAsDataURL(newFile)
				setFile(newFile)
				setSrc(reader.result)
				setSize(newFile.size)
				updateFields({
					file_MP3: {
						file: newFile,
						fileName: newFile.name,
						size: newFile.size,
					},
				})
			}
			// console.log("file:", file, "fileName:", fileName)
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
	// 	// This useEffect will run after each render when file changes
	// 	updateFields({
	// 		fileProps: file,
	// 		fileNameProps: fileName,
	// 		fileSizeProps: size,
	// 		fileSrcProps: src,
	// 	})
	// }, [file, fileName, size, src])

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
							{!file ? (
								<span>Upload .mp3 or .wav files only</span>
							) : (
								<span>
									{fileName} &#8226;{" "}
									{Math.round(size * 10e-6)}MB{" "}
								</span>
							)}
						</p>
					</div>
				</div>

				<div className="flex gap-2">
					<Button
						component="label"
						variant="contained"
						disabled={!file}
						startIcon={<PlayCircleIcon />}
						sx={{ width: "115px", height: "40px" }}
					>
						Play
					</Button>

					<Button
						component="label"
						variant="contained"
						startIcon={!file ? <CloudUploadIcon /> : <CachedIcon />}
						sx={{ width: "115px", height: "40px" }}
					>
						{!file ? "Upload" : "Replace"}
						<VisuallyHiddenInput
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


// **********************

import UploadFile from "./Upload Components/UploadFile"
import UploadFolder from "./Upload Components/UploadFolder"

export default function Files({

	file_MP3,
	updateFields,
}) {
	return (
		<>
			<div className="flex flex-col gap-4">

				<UploadFile fileData={file_MP3} updateFields={updateFields} />
				{/* <UploadFolder /> */}
			</div>
		</>
	)
}
