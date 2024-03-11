"use client"

import FilterDropDown from "./FilterDropDown"
import BPMSlider from "./BPMSlider"
import Button from "@mui/material/Button"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function FilterSection({
	filteredProducts,
	genres,
	moods,
	instruments,
	bpmRange
}) {
	const searchParams = useSearchParams()
	const router = useRouter()

	function getSearchParam(query) {
		return searchParams.get(query)
	}

	const filters = [
		{ name: "genres", items: genres, value: getSearchParam("genres") },
		{ name: "moods", items: moods, value: getSearchParam("moods") },
		{
			name: "instruments",
			items: instruments,
			value: getSearchParam("instruments"),
		},
	]

	function clearSearch() {
		router.replace("/store", undefined, { shallow: true })
		router.refresh()
	}

	const allBPM = filteredProducts
		.map((product) => product.bpm)
		.sort((a, b) => a - b)
	const minBmp = Math.min(...allBPM)
	const maxBmp = Math.max(...allBPM)

	const BPMRange = [minBmp, maxBmp]

	return (
		<div className="w-full flex flex-col justify-start items-center gap-4 bg-bg-elevated p-4">
			<div className=' w-full flex justify-start items-center gap-4 '>
				<Button onClick={clearSearch}>Clear Search</Button>
				{filters.map((filter) => (
					<FilterDropDown
						key={filter.name}
						items={filter.items}
						paramName={filter.name}
						selected={filter.value}
						filteredProducts={filteredProducts}
					/>
				))}
			</div>

			<BPMSlider selected={BPMRange} bpms={allBPM} bpmRange={bpmRange} />
		</div>
	)
}
