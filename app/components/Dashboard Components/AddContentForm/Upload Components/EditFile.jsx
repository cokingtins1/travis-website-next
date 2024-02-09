import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import FolderIcon from "@mui/icons-material/Folder"
import CachedIcon from "@mui/icons-material/Cached"
import { useEffect, useState } from "react"
import PlayAudioButton from "@/app/components/UI/PlayAudioButton"

export default function EditFile({
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
					<span className="flex items-center border rounded border-border-primary p-2">
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
								<span className='text-xs'>
									{fileNameProps} &#8226;{" "}
									{Math.round(fileSizeProps * 10e-6)}MB{" "}
								</span>
							)}
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<PlayAudioButton
						styles={{
							width: "85px",
							height: "30px",
							fontSize: "x-small",
						}}
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
						sx={{
							width: "85px",
							height: "30px",
							fontSize: "x-small",
						}}
					>
						{!fileProps ? "Upload" : "Replace"}
						<VisuallyHiddenInput
							id="file"
							name="file"
							type="file"
							onChange={(e) => {
								handleChange(e)
							}}
						/>
					</Button>
				</div>
			</div>
		</>
	)
}
