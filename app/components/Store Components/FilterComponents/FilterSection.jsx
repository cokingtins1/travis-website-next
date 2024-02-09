// import { useState } from "react"
import FilterDropDown from "../../UI/FilterDropDown"
import BPMSlider from "./BPMSlider"

export default function FilterSection({ genres, moods, instruments }) {
	// const searchParams = useSearchParams()
	// console.log(searchParams.get('moods'))

	// const [filterValues, setFilterValues] = useState([])

	// function updateFilters(filters) {
	// 	setFilterValues((prev) => {
	// 		return [...prev, filters]
	// 	})
	// }

	const test = ["balls", "big balls", "even bigger balls"]

	return (
		<div className="w-full flex justify-start items-center gap-4 bg-bg-elevated p-4">
			{/* {filterValues.map((filter, index) => (
				<span key={index}>{filter}</span>
			) )} */}
			<FilterDropDown
				// updateFilters={updateFilters}
				label="GENRE"
				items={genres}
				type={"genres"}
			/>
			<FilterDropDown
				// updateFilters={updateFilters}
				label="MOODS"
				items={moods}
				type={"moods"}
			/>
			<FilterDropDown
				// updateFilters={updateFilters}
				label="INSTRUMENTS"
				items={instruments}
				type={"instruments"}
			/>

			<FilterDropDown
				// updateFilters={updateFilters}
				label="BALLS"
				items={test}
				type={"test"}
			/>
			<BPMSlider />
		</div>
	)
}
