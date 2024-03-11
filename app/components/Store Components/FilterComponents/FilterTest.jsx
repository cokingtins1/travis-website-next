"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react"

export const FilterTest = ({ selected, items, paramName }) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [value, setValue] = useState("")

	// const options = ["mew", "mewtwo", "pikachu"]

	const unique = items
		.filter((value, index, array) => array.indexOf(value) === index)
		.sort()

	function getOccurrence(array, value) {
		return array.filter((v) => v === value).length
	}

	const updateQueryParam = (paramName, value) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()))

		if (!value) {
			current.delete(paramName)
		} else {
			current.set(paramName, value)
		}

		const search = current.toString()
		const query = search ? `?${search}` : ""

		router.push(`${pathname}${query}`)
	}

	const onSelect = (e) => {
		const value = e.target.value.trim()
		updateQueryParam(paramName, value)
	}

	return (
		<>
			<TextField
				fullWidth
				size="small"
				id={paramName}
				type="text"
				InputLabelProps={{
					shrink: true,
				}}
				select
				value={value}
				onChange={(e) => {
					const newValue = e.target.value
					setValue(newValue)
					onSelect(e)
					// updateFilters(e.target.value)
				}}
			>
				{unique.map((item) => (
					<MenuItem key={item} value={item}>
						{`${item} (${getOccurrence(items, item)}) `}
					</MenuItem>
				))}
			</TextField>
		</>
	)
}
