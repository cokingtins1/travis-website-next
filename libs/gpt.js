//EditFile.jsx: 

export default function EditFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	updateFields,
	type,
}) {
	const [error, setError] = useState("")
	// const [audioSrc, setAudioSrc] = useState("")

	const {
		drawerOpen,
		audioSrc,
		audioSrcId,
		setAudioSrc,
		playing,
		togglePlayPause,
		file,
		setFile,
		tempMP3,
		tempWAV,
		setTempMP3,
		setTempWAV,
	} = useAudio()

	useEffect(() => {
		if (!fileProps) return

		const blob = new Blob([JSON.stringify(fileProps, null, 2)], {
			type: "application/json",
		})
		const fileUrl = URL.createObjectURL(blob)

		if (type === "MP3") {
			setTempMP3({
				file: fileProps,
				audioSrc: fileUrl,
				fileName: fileNameProps,
				fileSize: fileSizeProps,
				title: fileNameProps,
				fileSrcType: "audio/mpeg",
				type: "MP3",
			})
		} else if (type === "WAV") {
			setTempWAV({
				file: fileProps,
				audioSrc: fileUrl,
				fileName: fileNameProps,
				fileSize: fileSizeProps,
				title: fileNameProps,
				fileSrcType: "audio/wav",
				type: "WAV",
			})
		}
	}, [])

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
								<span className="text-xs">
									{fileNameProps} &#8226;{" "}
									{Math.round(fileSizeProps * 10e-6)}MB{" "}
								</span>
							)}
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					{type !== "STEM" && (
						<Button
							component="label"
							variant="contained"
							sx={{
								width: "85px",
								height: "30px",
								fontSize: "x-small",
							}}
							disabled={!fileProps}
							startIcon={
								file.type === type && playing ? (
									<PauseIcon />
								) : (
									<PlayCircleIcon />
								)
							}
							onClick={() => {
								if (type === "MP3") {
									console.log(tempMP3)
									togglePlayPause(tempMP3.audioSrc)
								} else if (type === "WAV") {
									togglePlayPause(tempWAV.audioSrc)
								}
							}}
						>
							{file.type === type && playing ? "Pause" : "Play"}
						</Button>
					)}

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

// UploadFile.jsx:



export default function UploadFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	updateFields,
	type,
}) {
	const [error, setError] = useState("")
	const {
		drawerOpen,
		audioSrc,
		audioSrcId,
		setAudioSrc,
		playing,
		togglePlayPause,
		file,
		setFile,
		tempMP3,
		tempWAV,
		setTempMP3,
		setTempWAV,
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
								file.type === type && playing ? (
									<PauseIcon />
								) : (
									<PlayCircleIcon />
								)
							}
							onClick={() => {
								if (type === "MP3") {
									togglePlayPause(tempMP3.audioSrc)
								} else if (type === "WAV") {
									togglePlayPause(tempWAV.audioSrc)
								}
							}}
						>
							{file.type === type && playing ? "Pause" : "Play"}
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

// AudioContext.js: 

"use client"

import React, { createContext, useContext, useState } from "react"

const AudioContext = createContext()

export const AudioContextProvider = ({ children }) => {
	const [audioSrcId, setAudioSrcId] = useState(null)
	const [audioSrc, setAudioSrc] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [ref, setRef] = useState(null)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [file, setFile] = useState({})

	const [tempMP3, setTempMP3] = useState({})
	const [tempWAV, setTempWAV] = useState({})

	const getRef = (ref) => {
		setRef(ref)
	}

	const clearAudio = () => {
		setAudioSrcId(null)
		setAudioSrc(null)
		setDrawerOpen(false)
		setRef(null)
		setPlaying(false)
		// setTempMP3(null)
		// setTempWAV(null)
	}



	const togglePlayPause = (audioSrc) => {
		const isDifferentAudio = (tempMP3 && audioSrc !== tempMP3.audioSrc) || (tempWAV && audioSrc !== tempWAV.audioSrc);
	
		setFile({
			fileName: isDifferentAudio ? (tempMP3 ? tempMP3.fileName : tempWAV.fileName) : "",
			fileSize: isDifferentAudio ? (tempMP3 ? tempMP3.fileSize : tempWAV.fileSize) : "",
			type: isDifferentAudio ? (tempMP3 ? tempMP3.type : tempWAV.type) : "",
		});
	
		if (isDifferentAudio) {
			setPlaying(!playing);
			setAudioSrc(audioSrc);
			setDrawerOpen(true);
			setAudioSrcId(audioSrc);
		} else {
			setPlaying(!playing);
		}
	
		if (!ref && audioSrc) {
			setAudioSrcId(audioSrc);
			setPlaying(!playing);
		} else {
			if (!playing) {
				setPlaying(false);
				ref.current?.play();
			} else {
				setPlaying(true);
				ref.current?.pause();
			}
		}
	};

	const values = {
		audioSrcId,
		playing,
		drawerOpen,
		audioSrc,
		file,
		tempMP3,
		tempWAV,
		ref,
		setRef,
		setTempMP3,
		setTempWAV,
		setFile,
		setAudioSrc,
		setDrawerOpen,
		setAudioSrcId,
		setPlaying,
		togglePlayPause,
		getRef,
		clearAudio,
	}

	return (
		<AudioContext.Provider value={values}>{children}</AudioContext.Provider>
	)
}

export const useAudio = () => {
	return useContext(AudioContext)
}

//InfoEdit.jsx: 

"use client"


export default function InfoEdit({ product, productFiles, pricing }) {
	const INITIAL_DATA = {
		MP3_file: productFiles.MP3_file || null,
		MP3_fileName: product.title || null,
		MP3_fileSize: productFiles.MP3_file?.metadata?.size || null,

		WAV_file: productFiles.WAV_file || null,
		WAV_fileName: product.title || null,
		WAV_fileSize: productFiles.WAV_file?.metadata?.size || null,

		STEM_file: productFiles.STEM_file || null,
		STEM_fileName: product.title || null,
		STEM_fileSize: productFiles.STEM_file?.metadata?.size || null,

		productImage: productFiles.productImage,
		productImageSrc: productFiles.productImage,

		title: product.title || "",
		description: product.description || "",
		type: product.type || "",
		tags: product.tags || [],
		genres: product.genres || [],
		moods: product.moods || [],
		instruments: product.instruments || [],
		videoLink: product.video_link || "",
		keys: product.keys || "",
		bpm: product.bpm || "",

		basic: pricing.basic.isActive || true,
		basicPrice: pricing.basic.price || 30,
		premium: pricing.premium.isActive || true,
		premiumPrice: pricing.premium.price || 150,
		exclusive: pricing.exclusive.isActive || true,
		exclusivePrice: pricing.exclusive.price || 350,
		free: product.free || false,
	}

	const [data, setData] = useState(INITIAL_DATA)
	const [editing, setEditing] = useState(false)
	const [dataLoading, setDataLoading] = useState(false)
	const [imageErr, setImageErr] = useState("")

	const {
		drawerOpen,
		setRef,
		audioSrc,
		audioSrcId,
		setAudioSrcId,
		setDrawerOpen,
		setAudioSrc,
		file,
		ref,
		clearAudio,
	} = useAudio()

	useEffect(() => {
		clearAudio()
	}, [])

	function abortEditing(e) {
		e.preventDefault()
		setEditing(!editing)
		setData(INITIAL_DATA)
	}

	async function deleteProduct(e) {
		e.preventDefault()
		console.log("deleting product")
	}

	async function handleSubmit(e) {
		e.preventDefault()

		const formData = createFormData(data, "product_id", product.id)

		try {
			setDataLoading(true)
			const res = await toast.promise(
				fetch("/api/updateData", {
					method: "PUT",
					body: formData,
				}),
				{
					pending: "Upadating fields",
					success: "Fields updated successfully",
					error: "Error updating filds",
				}
			)

			if (res.ok) {
				setDataLoading(false)
				setEditing(false)
			} else {
				setDataLoading(false)
				throw new Error("There was an error updating the files")
			}
		} catch (error) {
			console.log(error)
		}

		// console.log("intiial data:", INITIAL_DATA, "data:", data)
		// console.log(INITIAL_DATA == data)
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

	function updateFields(fields) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}



	return (
		<form>

			<div className="max-w-[1200px] grid grid-cols-12 gap-4 p-4">
				<div className={`col-span-12 ${media.fileLg}`}>

					<div className="flex flex-col gap-4">
						<EditFile
							type="MP3"
							fileProps={data.MP3_file}
							fileNameProps={data.MP3_fileName}
							fileSizeProps={data.MP3_fileSize}
							updateFields={(fields) =>
								updateFields({
									MP3_file: fields.file,
									MP3_fileName: fields.fileName,
									MP3_fileSize: fields.fileSize,
								})
							}
						/>

						<EditFile
							type="WAV"
							fileProps={data.WAV_file}
							fileNameProps={data.WAV_fileName}
							fileSizeProps={data.WAV_fileSize}
							updateFields={(fields) =>
								updateFields({
									WAV_file: fields.file,
									WAV_fileName: fields.fileName,
									WAV_fileSize: fields.fileSize,
								})
							}
						/>
						<EditFile
							type="STEM"
							fileProps={data.STEM_file}
							fileNameProps={data.STEM_fileName}
							fileSizeProps={data.STEM_fileSize}
							updateFields={(fields) =>
								updateFields({
									STEM_file: fields.file,
									STEM_fileName: fields.fileName,
									STEM_fileSize: fields.fileSize,
								})
							}
						/>
					</div>
				</div>
			</div>
			<div className="h-[110px]">
				{audioSrcId && audioSrc === audioSrcId && (
					<AudioDrawer
						key={audioSrcId}
						audioSrc={audioSrcId}
						srcType={file.fileSrcType || "audio/mpeg"}
						file={file}
					/>
				)}
			</div>
		</form>
	)
}

//AudioDrawer.jsx: 

"use client"

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import IconButton from "@mui/material/IconButton"
import VolumeDown from "@mui/icons-material/VolumeDown"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import Slider from "@mui/material/Slider"
import { useEffect, useRef, useState } from "react"
import AudioProgressBar from "./AudioProgressBar"
import Tooltip from "@mui/material/Tooltip"
import CloseIcon from "@mui/icons-material/Close"
import { useAudio } from "@/libs/contexts/AudioContext"
import AudioProductSection from "./AudioProductSection"

export default function AudioDrawer({
	audioSrc, //required
	srcType, //required
	file = false,
	product = null,
	startingPrice = null,
	imageSrc = null,
}) {
	const audioRef = useRef(null)
	const [isReady, setIsReady] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currentProgress, setCurrentProgress] = useState(0)
	const [buffered, setBuffered] = useState(0)
	const [volume, setVolume] = useState(0.2)

	const {
		audioSrcId,
		setAudioSrcId,
		playing,
		setPlaying,
		togglePlayPause,
		getRef,
		drawerOpen,
		setDrawerOpen,
	} = useAudio()

	useEffect(() => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration)
		}
	}, [])

	useEffect(() => {
		audioRef.current?.pause()

		const timeOut = setTimeout(() => {
			audioRef.current?.play()
		}, 500)

		getRef(audioRef)

		return () => {
			clearTimeout(timeOut)
		}
	}, [audioSrcId])




	const closePlayer = () => {
		togglePlayPause(audioSrc) 
		setDrawerOpen(false)
		setPlaying(false)
		setAudioSrcId(null)
	}

	const handleVolumeChange = (e) => {
		if (!audioRef.current) return
		const volumeValue = e.target.value
		audioRef.current.volume = volumeValue
		setVolume(volumeValue)
	}

	const handleMuteUnmute = () => {
		if (!audioRef.current) return

		if (audioRef.current.volume !== 0) {
			audioRef.current.volume = 0
		} else {
			audioRef.current.volume = 0.3
		}
	}

	const handleBufferProgress = (e) => {
		const audio = e.currentTarget
		const dur = audio.duration
		if (dur > 0) {
			for (let i = 0; i < audio.buffered.length; i++) {
				if (
					audio.buffered.start(audio.buffered.length - 1 - i) <
					audio.currentTime
				) {
					const bufferedLength = audio.buffered.end(
						audio.buffered.length - 1 - i
					)
					setBuffered(bufferedLength)
					break
				}
			}
		}
	}

	function volumeLabelFormat(value) {
		return (value * 100).toFixed()
	}

	return (
		<>
			<div
				className={`${
					file || "fixed left-0 bottom-0"
				} w-full bg-bg-elevated transition-transform duration-300 ease-in-out ${
					drawerOpen ? "translate-y-0" : "translate-y-full"
				} `}
			>
				<audio
					ref={audioRef}
					preload="metadata"
					onDurationChange={(e) =>
						setDuration(e.currentTarget.duration)
					}
					onPlaying={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
					// onEnded={handleNext}
					onCanPlay={(e) => {
						e.currentTarget.volume = volume
						setIsReady(true)
					}}
					onTimeUpdate={(e) => {
						setCurrentProgress(e.currentTarget.currentTime)
						handleBufferProgress(e)
					}}
					onProgress={handleBufferProgress}
					onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
					loop
				>
					<source type={srcType} src={audioSrc} />
				</audio>
				<div className="grid grid-cols-2 lg:grid-cols-3 justify-items-stretch items-center justify-center my-2 mx-16">
					<AudioProductSection
						imageSrc={imageSrc}
						product={product}
						startingPrice={startingPrice}
					/>
					<div className="justify-self-center">
						<div className="flex items-center justify-center">
							<IconButton sx={{ fontSize: "2.5rem" }}>
								<SkipPreviousIcon
									sx={{ color: "#a7a7a7" }}
									fontSize="inherit"
								/>
							</IconButton>
							<IconButton
								sx={{ fontSize: "3rem" }}
								id={audioSrc}
								onClick={() => togglePlayPause(audioSrc)}
								disabled={audioSrc === false}
							>
								{!playing ? (
									<PlayCircleFilledIcon fontSize="inherit" />
								) : (
									<PauseCircleFilledIcon fontSize="inherit" />
								)}
							</IconButton>
							<IconButton sx={{ fontSize: "2.5rem" }}>
								<SkipNextIcon
									sx={{ color: "#a7a7a7" }}
									fontSize="inherit"
								/>
							</IconButton>
						</div>
						<div className="text-center h-[30px]">
							{!isNaN(duration) && (
								<AudioProgressBar
									duration={duration}
									currentProgress={currentProgress}
									buffered={buffered}
									onChange={(e, value) => {
										if (!audioRef.current) return
										audioRef.current.currentTime = value

										setCurrentProgress(value)
									}}
								/>
							)}
						</div>
					</div>
					<div className="hidden lg:flex justify-self-end items-center w-[200px] gap-4 mt-8">
						<div className="absolute top-0 right-4">
							<Tooltip title={"Close Player"} placement="top">
								<IconButton
									onClick={() => closePlayer(audioSrc)}
								>
									<CloseIcon />
								</IconButton>
							</Tooltip>
						</div>
						<Tooltip
							title={volume === 0 ? "Unmute" : "Mute"}
							placement="top"
						>
							<IconButton onClick={handleMuteUnmute}>
								{volume === 0 ? (
									<VolumeOffIcon />
								) : (
									<VolumeDown />
								)}
							</IconButton>
						</Tooltip>
						<Slider
							aria-label="Volume"
							valueLabelDisplay="auto"
							valueLabelFormat={volumeLabelFormat}
							min={0}
							step={0.01}
							max={1}
							value={volume}
							sx={{ color: "#ffeec2" }}
							onChange={(e) => {
								handleVolumeChange(e)
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}


