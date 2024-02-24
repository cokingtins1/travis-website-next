"use client"

import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import IconButton from "@mui/material/IconButton"

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"

import AudioDrawer from "../Audio/AudioDrawer"
import { useAudio } from "@/libs/contexts/AudioContext"
import { useEffect } from "react"

export default function ProductCardImage({
	imageSrc,
	audioSrc,
	srcType,
	product,
	startingPrice,
}) {
	const {
		audioSrcId,
		setAudioSrcId,
		playing,
		togglePlayPause,
		drawerOpen,
		setDrawerOpen,
	} = useAudio()

	useEffect(() => {
		setAudioSrcId(null)
	}, [])


	return (
		<>
			<figure className="relative group flex flex-col items-center h-[85px] w-[85px]">
				<Image
					src={imageSrc ? imageSrc : beatKitImage}
					className="rounded-sm"
					fill={true}
					style={{ objectFit: "cover" }}
					sizes="(max-width: 430px), 85px "
					alt="product image"
				/>
				<figcaption className="absolute bottom-0 text-xs bg-bg-secondary rounded p-1">
					{product.bpm} BPM
				</figcaption>
				{audioSrc && (
					<figcaption className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-200">
						<IconButton
			
							sx={{ fontSize: "3rem" }}
							onClick={() => {
								{
									togglePlayPause(audioSrc)
								}
							}}
						>
							{audioSrc === audioSrcId && playing ? (
								<PauseCircleFilledIcon fontSize="inherit" />
							) : (
								<PlayCircleFilledIcon fontSize="inherit" />
							)}
						</IconButton>
					</figcaption>
				)}
			</figure>
			{audioSrc === audioSrcId && (
				<AudioDrawer
					audioSrc={audioSrc}
					srcType={srcType}
					startingPrice={startingPrice}
					product={product}
					imageSrc={imageSrc}
				/>
			)}
		</>
	)
}
