import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FolderIcon from "@mui/icons-material/Folder";
import CachedIcon from "@mui/icons-material/Cached";
import { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/Pause";
import { useAudio } from "@/libs/contexts/AudioContext";

import { UploadButton } from "@/app/utils/uploadthing";
import { tempFileIntoSupabase } from "@/app/actions/tempFileIntoSupabase";

export default function UploadFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	updateFields,
	audioSource = null,
	setAudioSrc = false,
	type,
	editing = true,
}) {
	const [error, setError] = useState("");
	const [file, setFile] = useState(!!fileProps);

	const {
		audioSrcId,
		playing,
		togglePlayPause,
		tempMP3,
		tempWAV,
		setTempMP3,
		setTempWAV,
		buttonId,
		closeDrawer,
	} = useAudio();

	let typeExt;
	let fileType;
	let endPoint;
	switch (type) {
		case "MP3":
			typeExt = ".mp3";
			fileType = "audio/mpeg";
			endPoint = "mp3Uploader";
			break;
		case "WAV":
			typeExt = ".wav";
			fileType = "audio/wav";
			endPoint = "wavUploader";
			break;
		case "STEM":
			typeExt = ".zip or .rar";
			fileType = "application/x-zip-compressed";
			endPoint = "stemUploader";

			break;
	}

	useEffect(() => {
		if (!setAudioSrc || !audioSource) {
			return;
		}

		if (type === "MP3") {
			setTempMP3({
				audioSrc: audioSource,
				fileName: fileNameProps,
				title: fileNameProps,
				fileSrcType: "audio/mpeg",
				type: "MP3",
			});
		} else if (type === "WAV") {
			setTempWAV({
				audioSrc: audioSource,
				fileName: fileNameProps,
				title: fileNameProps,
				fileSrcType: "audio/wav",
				type: "WAV",
			});
		}
	}, [setAudioSrc]);

	function handleChange(data) {
		if (data.type !== fileType) {
			setError(`Please upload files of type ${typeExt}`);
			return;
		}
		setError("");

		if (type === "MP3") {
			setTempMP3({
				file: data.name,
				audioSrc: data.url,
				fileName: data.name,
				fileSize: `${Math.round(data.size * 10e-6)}MB`,
				title: data.name.split(".")[0],
				fileSrcType: "audio/mpeg",
				type: type,
			});
		} else if (type === "WAV") {
			setTempWAV({
				file: data.name,
				audioSrc: data.url,
				fileName: data.name,
				fileSize: `${Math.round(data.size * 10e-6)}MB`,
				title: data.name.split(".")[0],
				fileSrcType: "audio/wav",
				type: type,
			});
		}
		updateFields({
			fileName: data.name,
			fileUrl: data.url,
			fileKey: data.key,
			fileSize: data.size,
			title: data.name.split(".")[0],
			switch: true,
			id: crypto.randomUUID(),
			delete: false,
		});

		setFile(true);
	}

	const handleRemove = (type) => {
		updateFields({
			fileName: null,
			fileUrl: null,
			fileKey: null,
			fileSize: null,
			title: null,
			switch: false,
			id: crypto.randomUUID(),
			delete: true,
		});

		if (type === "MP3") {
			if (audioSrcId === tempMP3.audioSrc) {
				closeDrawer();
			}
			setTempMP3({
				file: null,
				audioSrc: null,
				fileName: null,
				fileSize: null,
				title: null,
				fileSrcType: null,
				type: null,
			});
		}

		if (type === "WAV") {
			if (audioSrcId === tempWAV.audioSrc) {
				closeDrawer();
			}
			setTempWAV({
				file: null,
				audioSrc: null,
				fileName: null,
				fileSize: null,
				title: null,
				fileSrcType: null,
				type: null,
			});
		}
		setFile(false);
	};

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
	});

	return (
		<>
			<div className="h-[82px] flex justify-between items-center rounded-lg border border-border-primary p-2">
				<div className="flex items-center gap-2">
					<div className="flex items-center rounded-full border border-border-primary justify-center p-2">
						{type === "STEM" ? (
							<FolderIcon sx={{ fontSize: 40 }} />
						) : (
							<MusicNoteIcon sx={{ fontSize: 40 }} />
						)}
					</div>
					<div className="w-fit">
						<p className="font-semibold">
							{(type === "MP3" && "Tagged Audio") ||
								(type === "WAV" && "Un-Tagged Audio") ||
								(type === "STEM" && "Track Stems")}
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
					{file && (
						<>
							<Button
								disabled={!editing}
								variant="outlined"
								size="small"
								onClick={() => {
									const fileObj = { key: fileProps };
									tempFileIntoSupabase(fileObj, "delete");
									handleRemove(type);
								}}
								sx={{
									marginRight: "2rem",
									whiteSpace: "nowrap",
								}}
								color="warning"
							>
								Remove File
							</Button>
						</>
					)}
					{type === "STEM" && (
						<div className="w-[115px] h-[40px]"></div>
					)}
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
									);
								} else if (type === "WAV") {
									togglePlayPause(
										tempWAV.audioSrc,
										"WAV",
										tempWAV
									);
								}
							}}
						>
							{buttonId === type && playing ? "Pause" : "Play"}
						</Button>
					)}

					{/* <Button
						component="label"
						variant="contained"
						disabled={!editing}
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
								handleChange(e);
							}}
						/>
					</Button> */}

					<UploadButton
						endpoint={endPoint}
						className="ut-button:bg-green-600"
						onClientUploadComplete={(res) => {
							if (res.length === 0) return;
							handleChange(res[0]);
						}}
						onUploadError={(error) => {
							alert(`ERROR! ${error.message}`);
						}}
					/>
				</div>
			</div>
		</>
	);
}
