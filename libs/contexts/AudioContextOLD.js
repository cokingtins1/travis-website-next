"use client"

import React, { createContext, useContext, useState } from "react"

const AudioContext = createContext()

export const AudioContextProvider = ({ children }) => {
	const [audioSrcId, setAudioSrcId] = useState(null)
	const [audioSrc, setAudioSrc] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [ref, setRef] = useState(null)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [file, setFile] = useState(null)
	const [buttonId, setButtonId] = useState(null)

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

	// const togglePlayPause = (audioSrc) => {
	// 	if (tempMP3 && audioSrc === tempMP3.audioSrc) {
	// 		setFile({
	// 			fileName: tempMP3.fileName,
	// 			fileSize: tempMP3.fileSize,
	// 			type: tempMP3.type,
	// 		})
	// 	} else if (tempWAV && audioSrc === tempWAV.audioSrc) {
	// 		setFile({
	// 			fileName: tempWAV.fileName,
	// 			fileSize: tempWAV.fileSize,
	// 			type: tempWAV.type,
	// 		})
	// 	}

	// 	// console.log(
	// 	// 	"Condition:",
	// 	// 	(tempMP3 || tempWAV) && audioSrc !== audioSrcId
	// 	// )

	// 	if ((tempMP3 || tempWAV) && audioSrc !== audioSrcId) {
	// 		// console.log("playing before", playing)
	// 		setPlaying(true)
	// 		console.log((tempMP3 || tempWAV) && audioSrc !== audioSrcId)
	// 		console.log(playing)
	// 		setAudioSrc(audioSrc)
	// 		setDrawerOpen(true)
	// 		setAudioSrcId(audioSrc)
	// 	} else {
	// 		console.log("playing before", playing)
	// 		setPlaying(!playing)
	// 		console.log("playing after", playing)
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

	// 	// console.log(
	// 	// 	"audioSrc",
	// 	// 	audioSrc,
	// 	// 	"audioSrcId",
	// 	// 	audioSrcId,
	// 	// 	"audioSrc === tempMP3.audioSrc",
	// 	// 	audioSrc === tempMP3.audioSrc,

	// 	// 	"tempMP3",
	// 	// 	tempMP3,
	// 	// 	"temWAV",
	// 	// 	tempWAV,
	// 	// 	"playing",
	// 	// 	playing
	// 	// )
	// }

	const togglePlayPause = (audioSrc) => {
		// const isDifferentAudio = (tempMP3 && audioSrc !== tempMP3.audioSrc) || (tempWAV && audioSrc !== tempWAV.audioSrc);

		// setFile({
		// 	fileName: isDifferentAudio ? (tempMP3 ? tempMP3.fileName : tempWAV.fileName) : "",
		// 	fileSize: isDifferentAudio ? (tempMP3 ? tempMP3.fileSize : tempWAV.fileSize) : "",
		// 	type: isDifferentAudio ? (tempMP3 ? tempMP3.type : tempWAV.type) : "",
		// });

		// if (isDifferentAudio) {
		// 	setPlaying(!playing);
		// 	setAudioSrc(audioSrc);
		// 	setDrawerOpen(true);
		// 	setAudioSrcId(audioSrc);
		// } else {
		// 	setPlaying(!playing);
		// }

		// if (!ref && audioSrc) {
		// 	setAudioSrcId(audioSrc);
		// 	setPlaying(!playing);
		// } else {
		// 	if (!playing) {
		// 		setPlaying(false);
		// 		ref.current?.play();
		// 	} else {
		// 		setPlaying(true);
		// 		ref.current?.pause();
		// 	}
		// }

		setAudioSrcId(audioSrc)
		setButtonId(audioSrc)

		if (!ref) {
			setPlaying(!playing)
		} else {
			if (!playing) {
				ref.current.play()
			} else {
				ref.current.pause()
			}
			setPlaying(!playing)
		}

		setDrawerOpen(true)
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
		buttonId,
		setButtonId,
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
