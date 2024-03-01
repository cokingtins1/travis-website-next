"use client"

import { useAudio } from "@/libs/contexts/AudioContext"
import { useEffect } from "react"
import AudioDrawer from "./AudioDrawer"

export default function AudioPlayStore({ audioSrc, audioSrcType, product }) {
	const {
		audioSrcId,
		setAudioSrcId,
		playing,
		togglePlayPause,
		drawerOpen,
		setDrawerOpen,
	} = useAudio()

	useEffect(() => {
		setAudioSrcId(audioSrc)
		setDrawerOpen(true)
	}, [])

	return (
		<AudioDrawer
			audioSrc={audioSrc}
			srcType={audioSrcType}
			product={product}
			playOnMount={false}
            file={true}
		/>
	)
}
