"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
// import { useLocalStorage } from "../CustomHooks/useLocalStorage"
import Checkbox from "@mui/joy/Checkbox"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Close from "@mui/icons-material/Close"

function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		if (typeof window !== "undefined") {
			const jsonValue = localStorage.getItem(key)
			if (jsonValue != null) return JSON.parse(jsonValue)
		}
		return initialValue
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

export default function FilterBar() {
	const [openKeys, setOpenKeys] = useLocalStorage("openKeys", {})
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [checkBoxes, setCheckBoxes] = useLocalStorage("checkboxes", {})

	const filterItems = {
		"Product Type": [
			"808 Drum Samples",
			"Bundle",
			"Drum Breaks",
			"Multi Kit",
			"Sample Pack",
		],
		Genre: ["Breaks", "Dark", "FX", "Lo-fi", "Loops"],
	}

	const handleCheckbox = (checkboxKey) => {
		setCheckBoxes((prevCheckboxes) => ({
			...prevCheckboxes,
			[checkboxKey]: !prevCheckboxes[checkboxKey],
		}))
		// console.log(checkBoxes)
	}

	const toggleAccordion = (key) => {
		setOpenKeys({ ...openKeys, [key]: !openKeys[key] })
	}

	const list = () => (
		<>
			<Box className="w-60 p-2 mx-2">
				<Box className="flex justify-end cursor-pointer">
					<Close
						onClick={() => setDrawerOpen(false)}
						className=" mx-4"
					/>
				</Box>

				{Object.entries(filterItems).map(([key, values]) => (
					<div className="py-2" key={key}>
						<button
							onClick={() => toggleAccordion(key)}
							className="flex justify-between w-full"
						>
							<span>{key}</span>
							{openKeys[key] ? <span>-</span> : <span>+</span>}
						</button>
						{openKeys[key] && (
							<div
								key={key}
								className=" flex flex-col gap-2 text-slate-600 text-sm"
							>
								{values.map((value, index) => (
									<Checkbox
										checked={checkBoxes[value] || false}
										onChange={() => handleCheckbox(value)}
										className="overflow-hidden"
										color="neutral"
										key={index}
										label={value}
									/>
								))}
							</div>
						)}
					</div>
				))}
			</Box>
		</>
	)

	return (
		<>
			<button onClick={() => setDrawerOpen(!drawerOpen)}>
				Filter & Sort
			</button>
			<Drawer
				anchor="left"
				variant='permanent'
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			>
				{list()}
			</Drawer>
		</>
	)
}
