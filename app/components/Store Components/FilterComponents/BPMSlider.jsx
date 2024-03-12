"use client"

import Slider from "@mui/material/Slider"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

export default function BPMSlider({ selected, bpms, bpmRange }) {
	const [value, setValue] = useState([selected[0], selected[1]])

	useEffect(() => {
		setValue([selected[0], selected[1]])
	}, [selected])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const marks = bpms.map((bpm) => ({ label: bpm, value: bpm }))

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
		<div className="flex flex-col font-bold text-sm text-text-secondary w-full">
			<label>BPM</label>
			{bpmRange[0] === bpmRange[1] ? (
				<p>{bpms}</p>
			) : (
				<Link
					href={
						pathname +
						"?" +
						createQueryString("bpm", `${value[0]},${value[1]}`)
					}
				>
					<Slider
						sx={{ color: "#1976D2" }}
						value={value}
						step={null}
						marks={marks}
						min={selected[0]}
						max={selected[1]}
						onChange={handleChange}
						valueLabelDisplay="auto"
					/>
				</Link>
			)}
		</div>
	)
}
