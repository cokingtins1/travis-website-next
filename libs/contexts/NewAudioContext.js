"use client"

import React, { createContext, useContext, useState } from "react"

const NewAudioContext = createContext()

export const NewAudioContextProvider = ({ children }) => {
	const [audioSrcId, setAudioSrcId] = useState(null)
	const [audioSrc, setAudioSrc] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [ref, setRef] = useState(null)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [file, setFile] = useState({})

	const [tempMP3, setTempMP3] = useState({})
	const [tempWAV, setTempWAV] = useState({})

	const [audioSrcGlobal, setAudioSrcGlobal] = useState(null)

	const audioElement = () => {
		reutrn 
	}

	const togglePlayPause = (audioSrc) => {

		if(audioSrc !== audioSrcGlobal){
			setAudioSrcGlobal(audioSrc)
		}

		if (audioSrc !== audioSrcId) {
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
		setRef,
		setTempMP3,
		setTempWAV,
		setFile,
		setAudioSrc,
		setDrawerOpen,
		setAudioSrcId,
		setPlaying,
		togglePlayPause,
	}

	return (
		<NewAudioContext.Provider value={values}>
			{children}
		</NewAudioContext.Provider>
	)
}

export const useNewAudio = () => {
	return useContext(NewAudioContext)
}
