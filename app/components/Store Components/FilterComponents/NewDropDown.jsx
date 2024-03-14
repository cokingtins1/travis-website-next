"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import Select from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import OutlinedInput from "@mui/material/OutlinedInput"
import { getFilterProducts } from "@/libs/utils"

export default function NewDropDown({
	paramName,
	filter,
	allFilters,
	setAllFilters,
}) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const queryParam = searchParams.get(paramName)

	const [selected, setSelected] = useState(
		searchParams.get(paramName)?.split(",") || []
	)

	function getOccurrence(arr, value) {
		return arr.reduce((occ, currentVal) => {
			return currentVal === value ? occ + 1 : occ
		}, 0)
	}

	// function handleChange(e) {
	// 	const selectedValues = e.target.value
	//     const queryParams = new URLSearchParams(window.location.search);
	//     const existingParamValue = queryParams.get(paramName); //returns

	//     console.log("existing",existingParamValue)
	// 	let queryString = `${path}?`

	// 	if (queryParam !== "") {
	// 		queryString += `${paramName}=${encodeURIComponent(selectedValues)}&`
	// 	}
	// 	console.log(queryString)
	// 	router.push(queryString.slice(0, -1))

	// 	setSelected(selectedValues)
	// }

	// useEffect(() => {
	// 	setAllFilters((prevFilters) => ({
	// 		...prevFilters,
	// 		[paramName]: String(selected),
	// 	}))
	// }, [searchParams])

	const handleChange = (e) => {
		const selectedValues = e.target.value
		setSelected(selectedValues)

		setAllFilters((prevFilters) => ({
			...prevFilters,
			[paramName]: String(selectedValues),
		}))

		const current = new URLSearchParams(Array.from(searchParams.entries()))

		if (paramName === "tags") {
			const currentTags = current.getAll("tags")
			if (!selectedValues) {
				current.delete("tags")
			} else {
				const updatedTags = selectedValues
					.split(",")
					.filter((tag) => tag.trim() !== "")
				const newTags = [...new Set([...currentTags, ...updatedTags])]
				current.set("tags", newTags.join(","))
			}
		} else {
			if (!selectedValues) {
				current.delete(paramName)
			} else {
				current.set(paramName, selectedValues)
			}
		}

		const search = current.toString()
		const query = search ? `?${search}` : ""

		router.push(`${pathname}${query}`, { scroll: false })
		router.refresh()
	}

	return (
		<div className="text-black w-[200px]">
			<label htmlFor="search"> Moods: </label>
			<Select
				fullWidth
				labelId="demo-multiple-checkbox-label"
				id="demo-multiple-checkbox"
				name="genres"
				multiple
				value={selected}
				onChange={handleChange}
				input={<OutlinedInput label="Genre" />}
				renderValue={(selected) => selected.join(", ")}
			>
				{filter.map((item) => (
					<MenuItem key={item} value={item}>
						{getOccurrence(allFilters, item) >= 1 && (
							<Checkbox checked={selected.includes(item)} />
						)}
						<ListItemText
							primary={`${item} (${getOccurrence(
								allFilters,
								item
							)})`}
						/>
					</MenuItem>
				))}
			</Select>
		</div>
	)
}
