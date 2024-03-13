"use client"

import FilterDropDown from "./FilterDropDown"
import Divider from "@mui/material/Divider"

import Button from "@mui/material/Button"

import BPMSliderNoRange from "./BPMSliderNoRange"
import { useSearch } from "@/libs/contexts/SearchContext"

export default function FilterSection({
	filteredProducts,
	genres,
	moods,
	instruments,
	filteredTags,
	bpmRange,
}) {
	const { getSearchParam, clearSearch, updateQueryParam } = useSearch()

	// console.log(getSearchParam("tags"))

	const filters = [
		{ name: "genres", items: genres, value: getSearchParam("genres") },
		{ name: "moods", items: moods, value: getSearchParam("moods") },
		{
			name: "instruments",
			items: instruments,
			value: getSearchParam("instruments"),
		},
	]

	const allBPM = filteredProducts
		.map((product) => product.bpm)
		.sort((a, b) => a - b)
	const minBmp = Math.min(...allBPM)
	const maxBmp = Math.max(...allBPM)

	const BPMRange = [minBmp, maxBmp]

	return (
		<div className="w-full flex flex-col items-center bg-bg-elevated p-4">
			<ul className="flex items-center gap-4 mb-4">
				<label className="font-bold text-sm text-text-secondary">
					TAGS:
				</label>
				{filteredTags?.map((tag, index) => {
					return (
						<li key={index}>
							<Button
								onClick={() => {
									updateQueryParam("tags", tag)
								}}
							>
								{tag}
							</Button>
						</li>
					)
				})}
			</ul>
			<div className="flex gap-4 mb-4 ">
				{filters.map((filter) => (
					<FilterDropDown
						key={crypto.randomUUID()}
						items={filter.items}
						paramName={filter.name}
						selected={filter.value}
						filteredProducts={filteredProducts}
					/>
				))}
			</div>
			<div className="flex">
				<Button onClick={clearSearch}>Clear Search</Button>
				<BPMSliderNoRange
					selected={BPMRange}
					bpms={allBPM}
					bpmRange={bpmRange}
				/>
			</div>
		</div>
	)
}
