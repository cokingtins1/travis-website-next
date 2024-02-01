"use client"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export default function FilterDropDown({ label, items }) {
	const [value, setValue] = useState("")

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

	// items will be array of all values in column

	// get unique list of items
	const unique = items
		.filter((value, index, array) => array.indexOf(value) === index)
		.sort()

	function getOccurrence(array, value) {
		return array.filter((v) => v === value).length
	}

	return (
		<>
			<div className="flex flex-col gap-1">
				<label className="w-[160px] font-bold text-sm text-text-secondary">
					{label}
				</label>
				<TextField
					fullWidth
					size="small"
					id={label}
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					select
					value={value}
					onChange={(e) => {
						const newValue = e.target.value
						setValue(newValue)
						// updateFilters(e.target.value)
					}}
				>
					{/* <div className="h-[200px]"> */}
					{unique.map((item, index) => (
						<MenuItem key={index} value={item}>
							<Link
								href={
									pathname +
									"?" +
									createQueryString(label.toLowerCase(), item)
								}
							>
								{`${item} (${getOccurrence(items, item)}) `}
							</Link>
						</MenuItem>
					))}
					{/* </div> */}
				</TextField>
			</div>
		</>
	)
}
