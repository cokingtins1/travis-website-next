import ProductCard from "../ProductCard/ProductCard"
import FilterSection from "./FilterComponents/FilterSection"

import { getBPMData, getFilterProducts, returnFilters } from "@/libs/utils"
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton"
import { Suspense } from "react"
// import { useEffect, useState } from "react"
// import { useSearch } from "@/libs/contexts/SearchContext"

export default function ProductSection({ productData, searchParams }) {
	// const [genres, setGenres] = useState()
	// const [moods, setMoods] = useState()
	// const [instruments, setInstruments] = useState()
	// const [tags, setTags] = useState()
	// const [bpm, setBPM] = useState()

	// const filters = [
	// 	{ name: "genres", value: ["Rap"] },
	// 	{ name: "moods", value: ["Chill"] },
	// 	{ name: "instruments", value: ["Drums"] },
	// 	{ name: "tags", value: ["Drake", "Party"] },
	// 	{ name: "bpm", value: [55, 133] },
	// ]

	// const filters = useMemo(() => [
	// 	{ name: "genres", value: genres },
	// 	{ name: "moods", value: moods },
	// 	{ name: "instruments", value: instruments },
	// 	{ name: "tags", value: tags },
	// 	{ name: "bpm", value: bpm },
	// ])

	// filteredData = useMemo(() => getFilterProducts(data, searchParams), [filters])

	const filteredProducts = getFilterProducts(productData, searchParams)

	// const { searchParams: searchParamsTwo } = useSearch()

	// useEffect(() => {
	// 	console.log("searchParams Changing")
	// }, [searchParamsTwo.size])

	const allBpmRange = getBPMData(productData)

	const filteredGenres = returnFilters(filteredProducts, "genres")
	const filteredMoods = returnFilters(filteredProducts, "moods")
	const filteredInstruments = returnFilters(filteredProducts, "instruments")
	const filteredTags = returnFilters(filteredProducts, "tags")

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full ">
				<div className="flex flex-col items-center gap-2 my-4 w-full">
					<FilterSection
						filteredProducts={filteredProducts}
						genres={filteredGenres}
						moods={filteredMoods}
						instruments={filteredInstruments}
						filteredTags={filteredTags}
						allBpmRange={allBpmRange}
					/>
				</div>
				<section className="w-full">
					<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
						<Suspense
							key={crypto.randomUUID()}
							fallback={
								<ul>
									<ProductCardSkeleton />
									<ProductCardSkeleton />
									<ProductCardSkeleton />
									<ProductCardSkeleton />
								</ul>
							}
						>
							{filteredProducts?.map((product, index) => (
								<ProductCard
									key={index}
									productData={product}
								/>
							))}
						</Suspense>
					</ul>
				</section>
			</div>
		</>
	)
}
