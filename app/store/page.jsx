import SearchComponent from "../components/SearchBar/SearchComponent"
import {
	getAllColVals,
	getAllProducts,
	getUniqueTags,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import Divider from "@mui/material/Divider"
import { Button } from "../components/UI/Button"
import NewProductCard from "../components/ProductCard/NewProductCard"
import FilterSection from "../components/FilterComponents/FilterSection"

export default async function Store({ searchParams }) {
	const products = await getAllProducts()
	const tags = await getUniqueTags()
	const genres = await getAllColVals("genres")
	const moods = await getAllColVals("moods")
	const instruments = await getAllColVals("instruments")

	// console.log("searParams.genre:", searchParams.genre)
	// console.log("searParams.moods:", searchParams.moods)
	// console.log("searParams.instruments:", searchParams.instruments)

	if (!products) {
		notFound()
	}

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full">
				<header className="my-4">
					<SearchComponent />
				</header>
				<div className="flex flex-col justify-center items-center w-full ">
					{/* Filter Section */}
					<div className="flex flex-col items-center gap-2 my-4">
						<div className="flex gap-4">
							{tags.map((tag, index) => {
								return <Button key={index}>{tag}</Button>
							})}
							<Divider />
						</div>
						<FilterSection
							genres={genres}
							moods={moods}
							instruments={instruments}
						/>
					</div>
					{/* Filter Section */}

					{/* PRODUCT SECTION */}
					<section className="w-full">
						<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
							{products.map((product, index) => (
								<NewProductCard key={index} product={product} />
							))}
						</ul>
					</section>
				</div>
			</main>
		</>
	)
}
