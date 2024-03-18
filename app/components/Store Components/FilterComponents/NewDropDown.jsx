"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import Select from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useSearch } from "@/libs/contexts/SearchContext"

export default function NewDropDown({
	paramName,
	filter,
	allFilters,
	setAllFilters,
	searchParams,
}) {
	const { sParams, updateQueryParam } = useSearch()

	const [selected, setSelected] = useState(
		sParams.get(paramName)?.split(",") || []
	)

	useEffect(() => {
		setSelected(sParams.get(paramName)?.split(",") || [])
	}, [searchParams])

	function getOccurrence(arr, value) {
		return arr.reduce((occ, currentVal) => {
			return currentVal === value ? occ + 1 : occ
		}, 0)
	}

	const handleChange = (e) => {
		const selectedValues = e.target.value

		if (selectedValues.length === 0) {
			setAllFilters((prevFilters) => {
				const updatedFilters = {
					...prevFilters,
					[paramName]: String(selectedValues),
				}

				delete updatedFilters[paramName]

				return updatedFilters
			})
		} else {
			setAllFilters((prevFilters) => ({
				...prevFilters,
				[paramName]: String(selectedValues),
			}))
		}

		updateQueryParam(paramName, selectedValues)
	}

	return (
		<div className="text-black w-[200px]">
			<label className="text-text-secondary text-xs">
				{paramName.toUpperCase()}
			</label>
			<Select
				fullWidth
				size="small"
				MenuProps={{
					PaperProps: {
						style: {
							maxHeight: "300px",
							overflowY: "auto",
						},
					},
				}}
				name={paramName}
				multiple
				value={selected}
				onChange={handleChange}
				input={<OutlinedInput size="small" />}
				renderValue={(selected) => selected.join(", ")}
				label={paramName}
			>
				{filter.map((item) => (
					<MenuItem key={item} value={item}>
						{getOccurrence(allFilters, item) >= 1 && (
							<>
								<Checkbox checked={selected.includes(item)} />
								<ListItemText
									primary={`${item} (${getOccurrence(
										allFilters,
										item
									)})`}
								/>
							</>
						)}
					</MenuItem>
				))}
			</Select>
		</div>
	)
}
