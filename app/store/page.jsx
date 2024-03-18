// "use client"

import SearchComponent from "../components/SearchBar/SearchComponent"
import { getAllProductData, likedByUser } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import ProductSection from "../components/Store Components/ProductSection"
import { SearchContextProvider } from "@/libs/contexts/SearchContext"
import { constructData } from "@/libs/supabase/supabseStoreData"
import { Suspense } from "react"
import StoreSkeleton from "../components/Skeletons/StoreSkeleton"

import JSONData from "./data.json"

export default async function Store({ searchParams }) {
	const data = await constructData()

	// console.log(data.map((p) => p.product_data.title))

	// if (!JSONData) {
	// 	notFound()
	// }

	// console.log(await likedByUser())

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full">
				{/* <header className="my-4">
					<SearchComponent />
				</header> */}
				<Suspense fallback={<StoreSkeleton />}>
					<SearchContextProvider>
						<ProductSection
							// data={JSONData}
							data={data}
							searchParams={searchParams}
						/>
					</SearchContextProvider>
				</Suspense>
			</main>
		</>
	)
}
