"use client"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"
import Slider from "@mui/material/Slider"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearch } from "@/libs/contexts/SearchContext"

export default function BPMSliderNoRange({ selected, bpms, bpmRange }) {
	const [value, setValue] = useState([selected[0], selected[1]])
	const [expanded, setExpanded] = useState(false)

	const { pathname, createBPMQuery } = useSearch()

	useEffect(() => {
		setValue([selected[0], selected[1]])
	}, [selected])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Accordion
			expanded={expanded}
			onChange={() => {
				setExpanded(!expanded)
			}}
			sx={{
				boxShadow: "none",
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				sx={{
					backgroundColor: "#121212",
					paddingLeft: 0,
					paddingRight: 0,
					"& > .MuiAccordionSummary-content": {
						margin: "0px",
					},
					"&.Mui-expanded": {
						minHeight: "36px",
					},
					minHeight: "36px",
				}}
			>
				{" "}
				<label className="font-bold text-sm text-text-secondary">
					{" "}
					BPM:
					<span className="font-normal">
						{` ${value[0]} ${
							value[0] !== value[1] ? "to " + value[1] : ""
						} `}
					</span>
				</label>
			</AccordionSummary>
			<AccordionDetails sx={{ backgroundColor: "#121212" }}>
				<div className="w-[300px]">
					<Link
						href={
							pathname +
							"?" +
							createBPMQuery("bpm", `${value[0]},${value[1]}`)
						}
					>
						<Slider
							sx={{ color: "#1976D2" }}
							value={value}
							min={bpmRange[0] || 0}
							max={bpmRange[1] || 200}
							onChange={handleChange}
							valueLabelDisplay="auto"
						/>
					</Link>
				</div>
			</AccordionDetails>
		</Accordion>
	)
}
