import ProductCard from "../ProductCard/ProductCard"
import FilterSection from "./FilterComponents/FilterSection"
import Divider from "@mui/material/Divider"
import Skeleton from "@mui/material/Skeleton"

export default function ProductSection({ productData, searchParams }) {
	const filteredProducts = productData.filter((product) =>
		Object.entries(searchParams).every(([key, value]) => {
			if (key === "bpm") {
				const [minBpm, maxBpm] = value.split(",").map(Number)
				return product[key] >= minBpm && product[key] <= maxBpm
			} else {
				return product[key] && product[key].includes(value)
			}
		})
	)

	function returnFilters(array, filter) {
		return Array.from(new Set(array.flatMap((product) => product[filter])))
	}

	const allBPM = productData
		.map((product) => product.bpm)
		.sort((a, b) => a - b)
	const minBmp = Math.min(...allBPM)
	const maxBmp = Math.max(...allBPM)
	const bpmRange = [minBmp, maxBmp]

	const filteredGenres = returnFilters(filteredProducts, "genres")
	const filteredMoods = returnFilters(filteredProducts, "moods")
	const filteredInstruments = returnFilters(filteredProducts, "instruments")

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full ">
				<div className="flex flex-col items-center gap-2 my-4">
					{/* <div className="flex gap-4">
						{tags?.map((tag, index) => {
							return <Button key={index}>{tag}</Button>
						})}
						<Divider />
					</div> */}
					<div className="flex">
						<FilterSection
							filteredProducts={filteredProducts}
							genres={filteredGenres}
							moods={filteredMoods}
							instruments={filteredInstruments}
							bpmRange={bpmRange}
						/>
					</div>
				</div>
				<section className="w-full">
					<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
						{filteredProducts?.map((product, index) => (
							<ProductCard key={index} product={product} />
						))}
					</ul>
				</section>
			</div>
		</>
	)
}
