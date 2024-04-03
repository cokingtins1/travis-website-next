"use client";

import ProductCard from "../ProductCard/ProductCard";

import { useEffect, useState } from "react";

import {
	getAudioList,
	getBPMData,
	productFilter,
	returnFilters,
} from "@/libs/utils";

import NewDropDown from "./FilterComponents/NewDropDown";
import TagList from "./FilterComponents/TagList";
import BPMSliderNoRange from "./FilterComponents/BPMSliderNoRange";
import ClearFilter from "./FilterComponents/ClearFilter";
import { useSearch } from "@/libs/contexts/SearchContext";

export default function ProductSection({ data, searchParams }) {
	const { clearSearch } = useSearch();

	const [allFilters, setAllFilters] = useState(searchParams);
	const [genreFilters, setGenreFilters] = useState(() =>
		returnFilters(data, "genres")
	);
	const [moodFilters, setMoodFilters] = useState(() =>
		returnFilters(data, "moods")
	);
	const [instrumentFilters, setInstrumentFilters] = useState(() =>
		returnFilters(data, "instruments")
	);

	const [tagFilters, setTagFilters] = useState(() =>
		returnFilters(data, "tags")
	);

	const [filteredData, setFilteredData] = useState(() => {
		if (Object.keys(searchParams).length > 0) {
			return productFilter(data, searchParams);
		} else {
			return data;
		}
	});
	const [audioList, setAudioList] = useState(
		getAudioList(data.map((p) => p.product_files))
	);

	console.log(getAudioList())

	const allBpmRange = getBPMData(data);

	useEffect(() => {
		const [genres, allGenres] = returnFilters(filteredData, "genres");
		setGenreFilters([genres, allGenres]);

		const [moods, allMoods] = returnFilters(filteredData, "moods");
		setMoodFilters([moods, allMoods]);

		const [instruments, allInstruments] = returnFilters(
			filteredData,
			"instruments"
		);
		setInstrumentFilters([instruments, allInstruments]);

		const [tags, allTags] = returnFilters(filteredData, "tags");
		setTagFilters([tags, allTags]);
		setAudioList(getAudioList(filteredData.map((p) => p.product_files)));
	}, [searchParams, filteredData]);

	useEffect(() => {
		setAllFilters(searchParams);
		setFilteredData(productFilter(data, searchParams));
		setAudioList(getAudioList(filteredData.map((p) => p.product_files)));
	}, [searchParams]);

	useEffect(() => {
		setFilteredData(productFilter(filteredData, allFilters));
		setAudioList(getAudioList(filteredData.map((p) => p.product_files)));
	}, [allFilters]);

	const [genres, allGenres] = genreFilters;
	const [moods, allMoods] = moodFilters;
	const [instruments, allInstruments] = instrumentFilters;
	const [tags, allTags] = tagFilters;

	const dropDowns = [
		{
			paramName: "genres",
			filter: genres,
			allFilters: allGenres,
		},
		{
			paramName: "moods",
			filter: moods,
			allFilters: allMoods,
		},
		{
			paramName: "instruments",
			filter: instruments,
			allFilters: allInstruments,
		},
	];

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mt-12 mb-8">
				<TagList
					paramName="tags"
					filter={tags}
					allFilters={allTags}
					setAllFilters={setAllFilters}
					searchParams={searchParams}
				/>
				<div className="flex flex-col items-center">
					<div className="flex flex-col sm:flex-row items-center justify-center gap-2 my-4 w-full">
						<div className="w-[100px]"></div>
						{dropDowns.map((comp, index) => (
							<NewDropDown
								key={index}
								paramName={comp.paramName}
								filter={comp.filter}
								allFilters={comp.allFilters}
								setAllFilters={setAllFilters}
								searchParams={searchParams}
							/>
						))}
						<div className="w-[100px] mt-4">
							{Object.entries(allFilters).length > 0 && (
								<ClearFilter
									value="Clear All"
									callBack={clearSearch}
								/>
							)}
						</div>
					</div>
					<BPMSliderNoRange
						allBpmRange={allBpmRange}
						setAllFilters={setAllFilters}
						searchParams={searchParams}
					/>
				</div>
			</div>
			<section className="w-full">
				<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
					{filteredData.length > 0 ? (
						filteredData.map((p, index) => (
							<ProductCard
								key={index}
								productData={p}
								audioList={audioList}
							/>
						))
					) : (
						<>
							<div>No results</div>
						</>
					)}
				</ul>
			</section>
		</>
	);
}
