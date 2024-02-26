import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import FolderIcon from "@mui/icons-material/Folder"
import CachedIcon from "@mui/icons-material/Cached"
import { useEffect, useState } from "react"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import PauseIcon from "@mui/icons-material/Pause"
import { useAudio } from "@/libs/contexts/AudioContext"

export default function UploadFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	updateFields,
	type,
}) {
	const [error, setError] = useState("")

	const {
		playing,
		togglePlayPause,
		tempMP3,
		tempWAV,
		setTempMP3,
		setTempWAV,
		buttonId,
	} = useAudio()

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
			if (type === "MP3") {
				setTempMP3({
					file: newFile,
					audioSrc: URL.createObjectURL(newFile),
					fileName: newFile.name,
					fileSize: `${Math.round(newFile.size * 10e-6)}MB`,
					title: newFile.name.split(".")[0],
					fileSrcType: "audio/mpeg",
					type: type,
				})
			} else if (type === "WAV") {
				setTempWAV({
					file: newFile,
					audioSrc: URL.createObjectURL(newFile),
					fileName: newFile.name,
					fileSize: `${Math.round(newFile.size * 10e-6)}MB`,
					title: newFile.name.split(".")[0],
					fileSrcType: "audio/wav",
					type: type,
				})
			}
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
					{type !== "STEM" && (
						<Button
							component="label"
							variant="contained"
							sx={{ width: "115px", height: "40px" }}
							disabled={!fileProps}
							startIcon={
								buttonId === type && playing ? (
									<PauseIcon />
								) : (
									<PlayCircleIcon />
								)
							}
							onClick={() => {
								if (type === "MP3") {
									togglePlayPause(
										tempMP3.audioSrc,
										"MP3",
										tempMP3
									)
								} else if (type === "WAV") {
									togglePlayPause(
										tempWAV.audioSrc,
										"WAV",
										tempWAV
									)
								}
							}}
						>
							{buttonId === type && playing ? "Pause" : "Play"}
						</Button>
					)}

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
