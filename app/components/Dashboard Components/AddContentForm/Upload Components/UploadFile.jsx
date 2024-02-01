import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import CachedIcon from "@mui/icons-material/Cached"
import { Button as MyButton } from "@/app/components/UI/Button"

import { useEffect, useState } from "react"

export default function UploadFile({ fileData, updateFields }) {
	const [fileName, setFileName] = useState(fileData.fileName)
	const [file, setFile] = useState(fileData.file)
	const [src, setSrc] = useState(fileData.src)
	const [size, setSize] = useState(fileData.size)

	function handleChange(e) {
		let reader = new FileReader()
		let file = e.target.files[0]

		if (file) {
			reader.onloadend = () => setFileName(file.name)
			if (file.name !== fileName) {
				reader.readAsDataURL(file)
				setSrc(reader.result)
				setFile(file)
				setSize(file.size)
			}
		}

	}

	useEffect(() => {
		if (file && fileName && src) {
			updateFields({
				fileData: {
					fileName: fileName,
					file: file,
					src: src,
				},
			})
		}
	}, [fileName, file, src])

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
								{fileName} &#8226; {Math.round(size * 10e-6)}MB{" "}
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
					<VisuallyHiddenInput onChange={handleChange} type="file" />
				</Button>
			</div>
		</div>
	)
}
