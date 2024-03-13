"use client"

import FilterDropDown from "./FilterDropDown"
import CloseIcon from "@mui/icons-material/Close"
import RefreshIcon from "@mui/icons-material/Refresh"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import Button from "@mui/material/Button"

import BPMSliderNoRange from "./BPMSliderNoRange"
import { useSearch } from "@/libs/contexts/SearchContext"
import { getBPMData, returnFilters } from "@/libs/utils"
import TagsList from "./TagsList"
import { useEffect, useState } from "react"

export default function FilterSection({
	filteredProducts,
	genres,
	moods,
	instruments,
	filteredTags,
	allBpmRange,
}) {
	const { getSearchParam, clearSearch, searchParams } = useSearch()

	const [tags, setTags] = useState(filteredTags.slice(0, 10))

	const filters = [
		{ name: "genres", items: genres, value: getSearchParam("genres") },
		{ name: "moods", items: moods, value: getSearchParam("moods") },
		{
			name: "instruments",
			items: instruments,
			value: getSearchParam("instruments"),
		},
	]


	// useEffect(() => {
	// 	const tagsInParams = getSearchParam("tags")?.split(",")

	// 	const filteredTags = returnFilters(tagsInParams, "tags")
	// 	console.log(filteredTags)
	// },[searchParams.size])

	function shuffleTags() {
		const shuffledTags = [...tags].sort(() => Math.random() - 0.5)
		setTags(shuffledTags)
	}

	const filteredBpmRange = getBPMData(filteredProducts)

	return (
		<div className="w-full flex flex-col items-center bg-bg-elevated rounded-lg p-4">
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
				{tags?.map((tag, index) => {
					return <TagsList key={index} tag={tag} />
				})}
			</ul>
			<div className="flex">
				<div className="flex flex-col ">
					<div className="flex items-center gap-4 mb-4">
						<div className="w-[130px]"></div>
						{filters.map((filter) => (
							<FilterDropDown
								key={crypto.randomUUID()}
								items={filter.items}
								paramName={filter.name}
								selected={filter.value}
								filteredProducts={filteredProducts}
							/>
						))}
						<div className="w-[130px]">
							{searchParams.size > 0 && (
								<Button
									color="warning"
									size="small"
									sx={{
										whiteSpace: "nowrap",
									}}
									startIcon={<CloseIcon />}
									onClick={clearSearch}
								>
									<span className="pt-1">Clear Search</span>
								</Button>
							)}
						</div>
					</div>
					<div className="m-auto">
						<BPMSliderNoRange
							selected={filteredBpmRange}
							allBpmRange={allBpmRange}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
