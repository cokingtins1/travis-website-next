// FileUpload.jsx
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import CachedIcon from "@mui/icons-material/Cached"
import { useState } from "react"

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

export default function NewFileUpload({ fileType, data, updateFields }) {
    // console.log(data['keys'])
	const [fileName, setFileName] = useState(data[`${fileType}_fileName`] || null)
	const [file, setFile] = useState(data[`${fileType}_file`] || null)
	const [src, setSrc] = useState(data[`${fileType}_fileSrc`] || null)
	const [size, setSize] = useState(data[`${fileType}_fileSize`] || 0)

	function handleChange(e) {
		let reader = new FileReader()
		let newFile = e.target.files[0]

		if (newFile) {
			reader.onloadend = () => setFileName(newFile.name)
			if (newFile.name !== fileName) {
				reader.readAsDataURL(newFile)
				setSrc(reader.result)
				setFile(newFile)
				setSize(newFile.size)

				// const fileData = {
				// 	file: newFile,
				// 	fileName: newFile.name,
				// 	src: reader.result,
				// 	size: newFile.size,
				// }

				// updateFields({ [`${fileType}_file`]: fileData });
				// updateFields(
				// 	data[`${fileType}_fileName`]: file,
				// 	[`${fileType}_fileName`]: fileName,
				// 	[`${fileType}_fileSize`]: size,
				// 	[`${fileType}_fileSrc`]: src,
				// )
			}
		}
	}

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
								<span>Upload .{fileType} files only</span>
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
							onChange={(e) => handleChange(e)}
							type="file"
						/>
					</Button>
				</div>
			</div>
		</>
	)
}
