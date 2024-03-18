"use client"

import React, { useEffect, useState } from "react"

import { useSearch } from "@/libs/contexts/SearchContext"

import RefreshIcon from "@mui/icons-material/Refresh"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import { shuffleArray } from "@/libs/utils"
import ClearFilter from "./ClearFilter"

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

	const [limitTags, setLimitTags] = useState(filter)

	function shuffleTags() {
		setLimitTags(shuffleArray(filter))
	}

	useEffect(() => {
		setSelected(sParams.get(paramName)?.split(",") || [])
	}, [searchParams])

	function getOccurrence(arr, value) {
		return arr.reduce((occ, currentVal) => {
			return currentVal === value ? occ + 1 : occ
		}, 0)
	}

	const handleClick = (value) => {
		if (selected?.includes(value)) return

		const selectedValues = [...selected, value]

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
		updateQueryParam(paramName, selectedValues)
	}

	const deleteValueFromFilters = (value) => {
		setSelected(selected.filter((v) => v !== value))
		setAllFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters }
			if (updatedFilters[paramName]) {
				updatedFilters[paramName] = updatedFilters[paramName]
					.split(",")
					.filter((item) => item !== value)
					.join(",")
				if (!updatedFilters[paramName]) {
					delete updatedFilters[paramName]
				}
			}

			return updatedFilters
		})
		updateQueryParam(
			paramName,
			selected.filter((v) => v !== value)
		)
	}

	return (
		<div className="flex justify-center items-center flex-wrap mb-4 border-y-[1px] border-divider py-2 w-3/4">
			<div className="flex items-center gap-2">
				<Tooltip title="Refresh Tags" placement="bottom">
					<IconButton sx={{ color: "#1976D2" }} onClick={shuffleTags}>
						<RefreshIcon sx={{ fontSize: "1rem" }} />
					</IconButton>
				</Tooltip>
				<label className="font-bold text-sm text-text-secondary">
					TAGS:
				</label>
			</div>
			<div className="flex">
				{selected.length > 0 &&
					selected.map((tag, index) => (
						<ClearFilter
							key={index}
							value={tag}
							callBack={deleteValueFromFilters}
						/>
					))}
			</div>
			<ul className="flex flex-grow flex-wrap justify-center">
				{filter
					.map((item) => (
						<React.Fragment key={item}>
							{getOccurrence(allFilters, item) >= 1 && (
								<Button
									className="whitespace-nowrap"
									value={item}
									onClick={() => {
										handleClick(item)
									}}
								>
									{item}
								</Button>
							)}
						</React.Fragment>
					))
					.slice(0, 12)}
			</ul>
		</div>
	)
}
