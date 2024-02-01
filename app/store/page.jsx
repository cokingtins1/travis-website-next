import SearchComponent from "../components/SearchBar/SearchComponent"
import {
	getAllColVals,
	getAllProducts,
	getUniqueTags,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import ProductSection from "../components/Store Components/ProductSection"

export default async function Store({ searchParams }) {
	const products = await getAllProducts()
	const tags = await getUniqueTags()
	const genres = await getAllColVals("genres")
	const moods = await getAllColVals("moods")
	const instruments = await getAllColVals("instruments")

	console.log("searParams from server:", searchParams)

	if (!products) {
		notFound()
	}

	if (!tags || !genres || !moods || !instruments) {
		notFound()
	}

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full">
				<header className="my-4">
					<SearchComponent />
				</header>
				<ProductSection
					products={products}
					tags={tags}
					genres={genres}
					moods={moods}
					instruments={instruments}
				/>
			</main>
		</>
	)
}
