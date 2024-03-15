"use client"

import React, { useEffect, useState } from "react"

import { useSearch } from "@/libs/contexts/SearchContext"

import RefreshIcon from "@mui/icons-material/Refresh"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"

export default function TagList({
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

	//filter is unique, allFilters is all

	const [limitTags, setLimitTags] = useState(filter.slice(0, 10))


	useEffect(() => {
		setSelected(sParams.get(paramName)?.split(",") || [])
	}, [searchParams])

	useEffect(() => {
		updateQueryParam(paramName, selected)
	}, [selected])

	function getOccurrence(arr, value) {
		return arr.reduce((occ, currentVal) => {
			return currentVal === value ? occ + 1 : occ
		}, 0)
	}

	const handleClick = (value) => {
		const selectedValues = [value]
		setSelected((prev) => [...prev, value])

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
	}

	return (
		<ul className="flex items-center gap-4 mb-4 border-y-[1px] border-divider py-2">
			<div className="flex items-center gap-2">
				<Tooltip title="Refresh Tags" placement="bottom">
					<IconButton
						sx={{ color: "#1976D2" }}
						onClick={() => {
							shuffleTags(tags)
						}}
					>
						<RefreshIcon sx={{ fontSize: "1rem" }} />
					</IconButton>
				</Tooltip>
				<label className="font-bold text-sm text-text-secondary">
					TAGS:
				</label>
			</div>
			{filter.map((item) => (
				<React.Fragment key={item}>
					{getOccurrence(allFilters, item) >= 1 && (
						<Button
							value={item}
							onClick={() => {
								handleClick(item)
							}}
						>
							{item}
						</Button>
					)}
				</React.Fragment>
			))}
		</ul>
	)
}
