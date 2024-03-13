import SearchComponent from "../components/SearchBar/SearchComponent"
import {
	getAllColVals,
	getAllProductData,
	getImageSrc,
	getUniqueTags,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import ProductSection from "../components/Store Components/ProductSection"
import { SearchContextProvider } from "@/libs/contexts/SearchContext"
import { constructData } from "@/libs/supabase/supabseStoreData"

export default async function Store({ searchParams }) {
	const productData = await getAllProductData() // check

	// const data = await getImageSrc("fa6255df-90cd-4ba2-b6b5-708c86dffa39")
	const data = await constructData()


	// console.log(productData)
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
						productData={productData}
						searchParams={searchParams}
						data={data}
					/>
				</SearchContextProvider>
			</main>
		</>
	)
}
