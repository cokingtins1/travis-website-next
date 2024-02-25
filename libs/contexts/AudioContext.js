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

	const [filePlaying, setFilePlaying] = useState(null)

	function selectFileToPlay(fileObject) {
		if (fileObject.type === "MP3") {
		}
	}

	const getRef = (ref) => {
		setRef(ref)
	}

	const togglePlayPause = (audioSrc) => {
		// if (tempMP3 || tempWAV) {
		// 	if (tempMP3 && audioSrc === tempMP3.audioSrc) {
		// 		setPlaying(!playing)
		// 		setAudioSrc(tempMP3.audioSrc)
		// 		setDrawerOpen(true)
		// 		setAudioSrcId(tempMP3.audioSrc)
		// 		setDrawerOpen(true)
		// 		setFile({
		// 			fileName: tempMP3.fileName,
		// 			fileSize: tempMP3.fileSize,
		// 			type: tempMP3.type,
		// 		})
		// 	}

		// 	if (tempWAV && audioSrc === tempWAV.audioSrc) {
		// 		setPlaying(!playing)
		// 		setAudioSrc(tempWAV.audioSrc)
		// 		setDrawerOpen(true)
		// 		setAudioSrcId(tempWAV.audioSrc)
		// 		setDrawerOpen(true)
		// 		setFile({
		// 			fileName: tempWAV.fileName,
		// 			fileSize: tempWAV.fileSize,
		// 			type: tempWAV.type,
		// 		})
		// 	}

		// 	if (tempMP3 && tempWAV && audioSrc !== audioSrcId) {
		// 		setPlaying(!playing)
		// 		setAudioSrc(audioSrc)
		// 		setDrawerOpen(true)
		// 		setAudioSrcId(audioSrc)
		// 		setDrawerOpen(true)
		// 	}

		// 	if (!ref && audioSrc) {
		// 		setAudioSrcId(audioSrc)
		// 		setPlaying(!playing)
		// 	} else {
		// 		if (!playing) {
		// 			setPlaying(false)
		// 			ref.current?.play()
		// 		} else {
		// 			setPlaying(true)
		// 			ref.current?.pause()
		// 		}
		// 	}
		// } else {
		// 	if (audioSrc !== audioSrcId) {
		// 		setPlaying(!playing)
		// 		setAudioSrc(audioSrc)
		// 		setAudioSrcId(audioSrc)
		// 		setDrawerOpen(true)
		// 	}
		// 	if (!ref && audioSrc) {
		// 		setAudioSrcId(audioSrc)
		// 		setPlaying(!playing)
		// 	} else {
		// 		if (!playing) {
		// 			setPlaying(false)
		// 			ref.current?.play()
		// 		} else {
		// 			setPlaying(true)
		// 			ref.current?.pause()
		// 		}
		// 	}
		// }

		if (tempMP3 && audioSrc === tempMP3.audioSrc) {
			setFile({
				fileName: tempMP3.fileName,
				fileSize: tempMP3.fileSize,
				type: tempMP3.type,
			})
		} else if (tempWAV && audioSrc === tempWAV.audioSrc) {
			setFile({
				fileName: tempWAV.fileName,
				fileSize: tempWAV.fileSize,
				type: tempWAV.type,
			})
		}

		if ((tempMP3 || tempWAV) && audioSrc !== audioSrcId) {
			setPlaying(!playing)
			setAudioSrc(audioSrc)
			setDrawerOpen(true)
			setAudioSrcId(audioSrc)
		} else {
			setPlaying(!playing)
			setAudioSrc(audioSrc)
			setAudioSrcId(audioSrc)
			setDrawerOpen(true)
		}

		if (!ref && audioSrc) {
			setAudioSrcId(audioSrc)
			setPlaying(!playing)
		} else {
			if (!playing) {
				setPlaying(false)
				ref.current?.play()
			} else {
				setPlaying(true)
				ref.current?.pause()
			}
		}
	}

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
	}

	return (
		<AudioContext.Provider value={values}>{children}</AudioContext.Provider>
	)
}

export const useAudio = () => {
	return useContext(AudioContext)
}
