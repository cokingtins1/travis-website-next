import SearchComponent from "../components/SearchBar/SearchComponent"
import { getAllProductData } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import ProductSection from "../components/Store Components/ProductSection"
import { SearchContextProvider } from "@/libs/contexts/SearchContext"
import { constructData } from "@/libs/supabase/supabseStoreData"

export default async function Store({ searchParams }) {
	const productData = await getAllProductData()

	const data = await constructData()

	if (!productData) {
		notFound()
	}

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full">
				{/* <header className="my-4">
					<SearchComponent />
				</header> */}
				<SearchContextProvider>
					<ProductSection
						productData={data}
						searchParams={searchParams}
					/>
				</SearchContextProvider>
			</main>
		</>
	)
}
