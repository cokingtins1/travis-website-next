"use client"

import ProductCard from "../ProductCard/ProductCard"

import { useEffect, useState } from "react"

import { productFilter, returnFilters } from "@/libs/utils"

import NewDropDown from "./FilterComponents/NewDropDown"
import StoreSkeleton from "../Skeletons/StoreSkeleton"
import TagList from "./FilterComponents/TagList"

export default function ProductSection({ data, searchParams }) {
	const [allFilters, setAllFilters] = useState(searchParams)
	const [genreFilters, setGenreFilters] = useState(() =>
		returnFilters(data, "genres")
	)
	const [moodFilters, setMoodFilters] = useState(() =>
		returnFilters(data, "moods")
	)
	const [instrumentFilters, setInstrumentFilters] = useState(() =>
		returnFilters(data, "instruments")
	)

	const [tagFilters, setTagFilters] = useState(() =>
		returnFilters(data, "tags")
	)

	const [bpm, setBpm] = useState(() =>
	returnFilters(data, "tags")
)


	const [filteredData, setFilteredData] = useState(() => {
		if (Object.keys(searchParams).length > 0) {
			return productFilter(data, searchParams)
		} else {
			return data
		}
	})

	useEffect(() => {
		const [genres, allGenres] = returnFilters(filteredData, "genres")
		setGenreFilters([genres, allGenres])

		const [moods, allMoods] = returnFilters(filteredData, "moods")
		setMoodFilters([moods, allMoods])

		const [instruments, allInstruments] = returnFilters(
			filteredData,
			"instruments"
		)
		setInstrumentFilters([instruments, allInstruments])

		const [tags, allTags] = returnFilters(filteredData, "tags")
		setTagFilters([tags, allTags])
	}, [searchParams, filteredData])

	useEffect(() => {
		setAllFilters(searchParams)
		setFilteredData(productFilter(data, searchParams))
	}, [searchParams])

	useEffect(() => {
		setFilteredData(productFilter(filteredData, allFilters))
	}, [allFilters])

	const [genres, allGenres] = genreFilters
	const [moods, allMoods] = moodFilters
	const [instruments, allInstruments] = instrumentFilters
	const [tags, allTags] = tagFilters

	// const [bpm, setBPM] = useState()

	function shuffleTags() {
		const shuffledTags = [...tags].sort(() => Math.random() - 0.5)
		setTags(shuffledTags)
	}

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mt-12">
				<TagList
					paramName="tags"
					filter={tags}
					allFilters={allTags}
					setAllFilters={setAllFilters}
					searchParams={searchParams}
					allFiltersState={allFilters}
				/>
				<div className="flex items-center justify-center gap-2 my-4 w-full">
					<NewDropDown
						paramName="genres"
						filter={genres}
						allFilters={allGenres}
						setAllFilters={setAllFilters}
						searchParams={searchParams}
						allFiltersState={allFilters}
					/>
					<NewDropDown
						paramName="moods"
						filter={moods}
						allFilters={allMoods}
						setAllFilters={setAllFilters}
						searchParams={searchParams}
						allFiltersState={allFilters}
					/>

					<NewDropDown
						paramName="instruments"
						filter={instruments}
						allFilters={allInstruments}
						setAllFilters={setAllFilters}
						searchParams={searchParams}
						allFiltersState={allFilters}
					/>
				</div>
				<section className="w-full">
					<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
						{filteredData.length > 0 ? (
							filteredData.map((p, index) => (
								<ProductCard key={index} productData={p} />
							))
						) : (
							<StoreSkeleton />
						)}
					</ul>
				</section>
			</div>
		</>
	)
}
