"use client"

import Slider from "@mui/material/Slider"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useCallback, useState } from "react"

export default function BPMSlider() {
	const [value, setValue] = useState([0, 200])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const pathname = usePathname()
	const searchParams = useSearchParams()

	const createQueryString = useCallback(
		(name, value) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	return (
		<div className="flex flex-col font-bold text-sm text-text-secondary w-48">
			<label>BPM</label>
			<Link
				href={
					pathname +
					"?" +
					createQueryString('bpm',`${value[0]},${value[1]}`)
				}
			>
				<Slider
					value={value}
					max={200}
					onChange={handleChange}
					valueLabelDisplay="auto"
				/>
			</Link>
		</div>
	)
}
