// EditFile.jsx:

export default function EditFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	updateFields,
	audioSource,
	type,
}) {
	const [error, setError] = useState("")
	const [file, setFile] = useState(!!fileProps)

	const {
		audioSrcId,
		playing,
		togglePlayPause,
		tempMP3,
		tempWAV,
		setTempMP3,
		setTempWAV,
		buttonId,
	} = useAudio()

	useEffect(() => {
		if (!audioSource) return

		if (type === "MP3") {
			setTempMP3({
				file: fileProps,
				audioSrc: audioSource,
				fileName: fileNameProps,
				fileSize: fileSizeProps,
				title: fileNameProps,
				fileSrcType: "audio/mpeg",
				type: "MP3",
			})
		} else if (type === "WAV") {
			setTempWAV({
				file: fileProps,
				audioSrc: audioSource,
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
					title: newFile?.name.split(".")[0],
					fileSrcType: "audio/mpeg",
					type: type,
				})
			} else if (type === "WAV") {
				setTempWAV({
					file: newFile,
					audioSrc: URL.createObjectURL(newFile),
					fileName: newFile.name,
					fileSize: `${Math.round(newFile.size * 10e-6)}MB`,
					title: newFile?.name.split(".")[0],
					fileSrcType: "audio/wav",
					type: type,
				})
			}
			updateFields({
				file: newFile,
				fileName: newFile.name,
				fileSize: newFile.size,
				title: newFile?.name.split(".")[0],
			})
		}
	}

	const handleRemove = (type) => {
		updateFields({
			file: null,
			fileName: null,
			fileSize: null,
			title: null,
			switch: false,
		})

		if (type === "MP3") {
			if (audioSrcId === tempMP3.audioSrc) {
				closeDrawer()
			}
			setTempMP3({
				file: null,
				audioSrc: null,
				fileName: null,
				fileSize: null,
				title: null,
				fileSrcType: null,
				type: null,
			})
		}

		if (type === "WAV") {
			if (audioSrcId === tempWAV.audioSrc) {
				closeDrawer()
			}
			setTempWAV({
				file: null,
				audioSrc: null,
				fileName: null,
				fileSize: null,
				title: null,
				fileSrcType: null,
				type: null,
			})
		}
		setFile(false)
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
								<span className="text-xs">
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
								variant="outlined"
								size="small"
								onClick={() => {
									handleRemove(type)
								}}
								sx={{ marginRight: "2rem" }}
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
							sx={{
								width: "100px",
								height: "35px",
								fontSize: "x-small",
							}}
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
						sx={{
							width: "100px",
							height: "35px",
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

//UploadFile.jsx:
export default function UploadFile({
	fileProps,
	fileNameProps,
	fileSizeProps,
	updateFields,
	type,
}) {
	const [error, setError] = useState("")
	const [file, setFile] = useState(!!fileProps)

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
		if (!e.target.files) return
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
				switch: true,
			})
		}
		setFile(true)
	}

	const handleRemove = (type) => {
		updateFields({
			file: null,
			fileName: null,
			fileSize: null,
			title: null,
			switch: false,
		})

		if (type === "MP3") {
			if (audioSrcId === tempMP3.audioSrc) {
				closeDrawer()
			}
			setTempMP3({
				file: null,
				audioSrc: null,
				fileName: null,
				fileSize: null,
				title: null,
				fileSrcType: null,
				type: null,
			})
		}

		if (type === "WAV") {
			if (audioSrcId === tempWAV.audioSrc) {
				closeDrawer()
			}
			setTempWAV({
				file: null,
				audioSrc: null,
				fileName: null,
				fileSize: null,
				title: null,
				fileSrcType: null,
				type: null,
			})
		}
		setFile(false)
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
								variant="outlined"
								size="small"
								onClick={() => {
									handleRemove(type)
								}}
								sx={{ marginRight: "2rem" }}
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
