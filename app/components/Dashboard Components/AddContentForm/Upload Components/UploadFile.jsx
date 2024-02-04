import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import FolderIcon from "@mui/icons-material/Folder"
import CachedIcon from "@mui/icons-material/Cached"
import { useState } from "react"
import PlayAudioButton from "@/app/components/UI/PlayAudioButton"

export default function UploadFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	updateFields,
	type,
}) {
	const [error, setError] = useState("")
	const [audioSrc, setAudioSrc] = useState("")

	let typeExt
	let fileType
	switch (type) {
		case "MP3":
			typeExt = ".mp3"
			fileType = "audio/mpeg"
			break
		case "WAV":
			typeExt = ".wav"
			fileType = "audio/wav"
			break
		case "STEM":
			typeExt = ".zip or .rar"
			fileType = "application/x-zip-compressed"
			break
	}

	function handleChange(e) {
		if (e.target.files[0].type !== fileType) {
			setError(`Please upload files of type ${typeExt}`)
			return
		}
		setError("")
		let newFile = e.target.files[0]

		if (newFile) {
			setAudioSrc(URL.createObjectURL(newFile))
			updateFields({
				file: newFile,
				fileName: newFile.name,
				fileSize: newFile.size,
				title: newFile.name.split(".")[0],
			})
		}
	}

	// function sortFiles(e){
	// 	const selectedFiles = e.target.files
	// 	if (selectedFiles.length === 0){
	// 		return
	// 	}
	// 	const sortedFiles = Array.from(selectedFiles).sort((a, b) => a.name.localeCompare(b.name))

	// }

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
						{type === "STEM" ? (
							<FolderIcon sx={{ fontSize: 40 }} />
						) : (
							<MusicNoteIcon sx={{ fontSize: 40 }} />
						)}
					</span>
					<div>
						<p className="font-semibold">
							{type === "STEM"
								? "Track Stems"
								: "Un-tagged audio"}
						</p>
						<p className="text-sm text-text-secondary">
							{!fileProps ? (
								error ? (
									<span className="text-text-error">
										{error}
									</span>
								) : (
									<span>Upload {typeExt} files only</span>
								)
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
					<PlayAudioButton
						audioSrc={audioSrc}
						disabled={!fileProps}
						fileType={fileType}
					/>

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
