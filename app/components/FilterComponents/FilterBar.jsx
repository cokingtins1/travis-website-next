import * as React from "react"
import { useState } from "react"
import Checkbox from "@mui/joy/Checkbox"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Close from "@mui/icons-material/Close"

export default function FilterBar({ mediaReq }) {
	const [openKeys, setOpenKeys] = useState(false)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [checkedItems, setCheckedItems] = useState({})

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

	const filterArray = []
	function storeFilters(value) {
		setCheckedItems(prevState => ({...prevState, [value]:!prevState[value]}))

		filterArray.push(value)
		console.log(filterArray)
	}

	const toggleAccordion = (key) => {
		setOpenKeys({ ...openKeys, [key]: !openKeys[key] })
	}

	const list = () => (
		<>
			<div className={`${!mediaReq ? "w-60 p-2 mx-2" : null}`}>
				{!mediaReq ? (
					<Box className="flex justify-end cursor-pointer">
						<Close
							onClick={() => setDrawerOpen(false)}
							className=" mx-4"
						/>
					</Box>
				) : null}

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
										onChange={() => storeFilters(value)}
										checked={checkedItems[value] || false}
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
			</div>
		</>
	)

	return (
		<div>
			{mediaReq ? (
				<div>{list()}</div>
			) : (
				<>
					<button onClick={() => setDrawerOpen(!drawerOpen)}>
						Filter & Sort
					</button>
					<Drawer
						anchor="left"
						open={drawerOpen}
						onClose={() => setDrawerOpen(false)}
					>
						{list()}
					</Drawer>
				</>
			)}
		</div>
	)
}
