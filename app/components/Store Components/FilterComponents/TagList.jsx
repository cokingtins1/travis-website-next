"use client"

import React, { useEffect, useState } from "react"

import { useSearch } from "@/libs/contexts/SearchContext"

import RefreshIcon from "@mui/icons-material/Refresh"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"
import { shuffleArray } from "@/libs/utils"

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

	const [limitTags, setLimitTags] = useState(filter.slice(0,10))

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

	return (
		<ul className="flex flex-wrap items-center gap-2 mb-4 border-y-[1px] border-divider py-2 w-3/4">
			<div className="flex items-center gap-2">
				<Tooltip title="Refresh Tags" placement="bottom">
					<IconButton
						sx={{ color: "#1976D2" }}
						onClick={shuffleTags}
					>
						<RefreshIcon sx={{ fontSize: "1rem" }} />
					</IconButton>
				</Tooltip>
				<label className="font-bold text-sm text-text-secondary">
					TAGS:
				</label>
			</div>
			<div className="flex items-center">
				{selected.length > 0 &&
					selected.map((tag, index) => (
						<Button
							key={index}
							color="warning"
							size="small"
							sx={{
								whiteSpace: "nowrap",
								fontSize: "0.75rem",
							}}
							// onClick={clearSearch}
						>
							<CloseIcon
								sx={{
									fontSize: "0.75rem",
									marginTop: "2.5px",
									marginRight: "2px",
								}}
							/>
							<span className="pt-1">{tag}</span>
						</Button>
					))}
			</div>
			<div
				className={`flex flex-grow ${
					!selected.length ? "justify-center" : "justify-start"
				}`}
			>
				{limitTags.map((item) => (
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
				))}
			</div>
		</ul>
	)
}
