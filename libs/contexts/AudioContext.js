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
	const [buttonId, setButtonId] = useState(null)
	const [volume, setVolume] = useState(0.2)

	const [currentIndex, setCurrentIndex] = useState(null)
	const [listLength, setListLength] = useState(null)

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

	const closeDrawer = () => {
		setAudioSrcId(null)
		setAudioSrc(null)
		setDrawerOpen(false)
		setRef(null)
		setPlaying(false)
	}

	const togglePlayPause = (audioSrc, inputId = null, inputFile = null) => {
		setAudioSrcId(audioSrc)

		inputId && setButtonId(inputId)
		inputFile &&
			setFile({
				fileName: inputFile.fileName,
				fileSize: inputFile.fileSize,
			})

		if (!ref) {
			setPlaying(!playing)
		} else {
			if (!playing) {
				ref.current?.play()
			} else {
				ref.current?.pause()
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
		volume,
		currentIndex,
		listLength,
		setListLength,
		setCurrentIndex,
		setVolume,
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
		closeDrawer,
	}

	return (
		<AudioContext.Provider value={values}>{children}</AudioContext.Provider>
	)
}

export const useAudio = () => {
	return useContext(AudioContext)
}
