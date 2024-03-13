import ProductCard from "../ProductCard/ProductCard"
import FilterSection from "./FilterComponents/FilterSection"
import Divider from "@mui/material/Divider"
import Skeleton from "@mui/material/Skeleton"
import Button from "@mui/material/Button"

export default function ProductSection({ productData, searchParams, data }) {
	// const filteredProducts = productData.filter((product) =>
	// 	Object.entries(searchParams).every(([key, value]) => {
	// 		if (key === "bpm") {
	// 			const [minBpm, maxBpm] = value.split(",").map(Number)
	// 			return product[key] >= minBpm && product[key] <= maxBpm
	// 		} else if (key === "tags") {
	// 			const tags = value.split(",").map((tag) => tag.trim())
	// 			return tags.every((tag) => product[key].includes(tag))
	// 		} else {
	// 			return product[key] && product[key].includes(value)
	// 		}
	// 	})
	// )

	const filteredProducts = data.filter((product) =>
		Object.entries(searchParams).every(([key, value]) => {
			if (key === "bpm") {
				const [minBpm, maxBpm] = value.split(",").map(Number)
				return (
					product.product_data[key] >= minBpm &&
					product.product_data[key] <= maxBpm
				)
			} else if (key === "tags") {
				const tags = value.split(",").map((tag) => tag.trim())
				return tags.every((tag) =>
					product.product_data[key].includes(tag)
				)
			} else {
				return (
					product.product_data[key] &&
					product.product_data[key].includes(value)
				)
			}
		})
	)

	function returnFilters(array, filter) {
		return Array.from(
			new Set(array.flatMap((product) => product.product_data[filter]))
		)
	}

	const allBPM = data
		.map((product) => product.product_data.bpm)
		.sort((a, b) => a - b)
	console.log(allBPM)
	// const minBmp = Math.min(...allBPM)
	// const maxBmp = Math.max(...allBPM)
	// const bpmRange = [minBmp, maxBmp]

	const filteredGenres = returnFilters(filteredProducts, "genres")
	const filteredMoods = returnFilters(filteredProducts, "moods")
	const filteredInstruments = returnFilters(filteredProducts, "instruments")
	const filteredTags = returnFilters(filteredProducts, "tags")

	// console.log(filteredGenres)
	// console.log(filteredMoods)
	// console.log(filteredInstruments)
	// console.log(filteredTags)

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full ">
				{/* <div className="flex flex-col items-center gap-2 my-4 w-full">
					<FilterSection
						filteredProducts={filteredProducts}
						genres={filteredGenres}
						moods={filteredMoods}
						instruments={filteredInstruments}
						filteredTags={filteredTags}
						bpmRange={bpmRange}
					/>
				</div> */}
				<section className="w-full">
					<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
						{filteredProducts?.map((product, index) => (
							<ProductCard key={index} productData={product} />
						))}
					</ul>
				</section>
			</div>
		</>
	)
}
