import SearchComponent from "../components/SearchBar/SearchComponent"
import {
	getAllColVals,
	getAllProductData,
	getUniqueTags,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import ProductSection from "../components/Store Components/ProductSection"

export default async function Store({ searchParams }) {
	const productData = await getAllProductData()
	const tags = await getUniqueTags()
	const genres = await getAllColVals("genres")
	const moods = await getAllColVals("moods")
	const instruments = await getAllColVals("instruments")

	// console.log("searParams from server:", searchParams)

	if (!productData) {
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
					productData={productData}
					tags={tags}
					genres={genres}
					moods={moods}
					instruments={instruments}
				/>
			</main>
		</>
	)
}
