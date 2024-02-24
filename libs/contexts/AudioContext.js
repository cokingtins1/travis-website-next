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

	function selectFileToPlay(fileObject){
		if(fileObject.type === 'MP3'){}
	}

	const getRef = (ref) => {
		setRef(ref)
	}

	const togglePlayPause = (audioSrc) => {
		// console.log(audioSrc, audioSrcId, drawerOpen, playing)

		console.log(audioSrc)
		console.log(ref?.current)

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

		// if (!audioSrc) return;

		// if (audioSrc !== audioSrcId || !ref) {
		//   setAudioSrcId(audioSrc);
		// }

		// setPlaying(!playing);

		// if (ref) {
		//   if (!playing) {
		//     ref.current?.play();
		//   } else {
		//     ref.current?.pause();
		//   }
		// }
	}

	const values = {
		audioSrcId,
		playing,
		drawerOpen,
		audioSrc,
		file,
		tempMP3,
		tempWAV,
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
