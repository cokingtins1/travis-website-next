// "use client"

// import React, { useEffect, useRef } from "react"
// import styles from "./styles.module.css"

// // import audioSrc from "./Nonstop.mp3"

// const AudioVisualizer = () => {

// 	let audioContext
// 	if (typeof window !== 'undefined') {
// 		audioContext = new (window.AudioContext || window.webkitAudioContext)();
// 	}
// 	const canvasRef = useRef()
// 	const audioRef = useRef()
// 	const containerRef = useRef()

// 	useEffect(() => {
// 		if (canvasRef.current) {
// 			const ctx = canvasRef.current.getContext("2d")
// 		}
// 	}, [])

// 	function playAudio() {
// 		const audio = new Audio()
// 		// audio.src = audioSrc
// 	}

// 	// useEffect(() => {
// 	// 	const handlePlaying = () => {
// 	// 		console.log("music is playing")
// 	// 	}
// 	// 	document.addEventListener("playing", handlePlaying)
// 	// 	return () => {
// 	// 		document.removeEventListener("playing", handlePlaying)
// 	// 	}
// 	// }, [])

// 	return (
// 		<div className={styles.container} ref={containerRef} id="content">
// 			<audio ref={audioRef} controls>
// 				<source src="/Nonstop.mp3"></source>
// 			</audio>
// 			<canvas className={styles.canvas} ref={canvasRef}></canvas>
// 		</div>
// 	)
// }

// export default AudioVisualizer

// // 			function renderFrame() {
// //     requestAnimationFrame(renderFrame)

// //     analyser.getByteFrequencyData(dataArray)

// //     ctx.fillStyle = "#000"
// //     ctx.fillRect(0, 0, canvas.width, canvas.height)

// //     for (let i = 0; i < bufferLength; i++) {
// //         const angle = (i / bufferLength) * 2 * Math.PI
// //         const radius = maxRadius * (dataArray[i] / 255)

// //         const x = centerX + radius * Math.cos(angle)
// //         const y = centerY + radius * Math.sin(angle)

// //         const r = 255
// //         const g = 50 * (i / bufferLength)
// //         const b = 50

// //         ctx.fillStyle = `rgb(${r},${g},${b})`
// //         ctx.beginPath()
// //         ctx.arc(x, y, 5, 0, 2 * Math.PI)
// //         ctx.fill()
// //     }
// // }

// // audio.play()
// // renderFrame()
// // }
