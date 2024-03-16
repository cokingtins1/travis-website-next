"use client"

import SearchComponent from "../components/SearchBar/SearchComponent"
import { getAllProductData } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import ProductSection from "../components/Store Components/ProductSection"
import { SearchContextProvider } from "@/libs/contexts/SearchContext"
import { constructData } from "@/libs/supabase/supabseStoreData"
import { Suspense } from "react"
import StoreSkeleton from "../components/Skeletons/StoreSkeleton"

import JSONData from "./data.json"

export default  function Store({ searchParams }) {
	// const [data, setData] = useState([])
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const data = await constructData()
	// 			setData(data)
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error)
	// 		}
	// 	}

	// 	fetchData()
	// }, [])

	// const data = await constructData()
	// console.log(JSONData.map((product) => product.product_data.product_id))
	if (!JSONData) {
		notFound()
	}

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full">
				{/* <header className="my-4">
					<SearchComponent />
				</header> */}
				<Suspense fallback={<StoreSkeleton />}>
					<SearchContextProvider>
						<ProductSection
							data={JSONData}
							searchParams={searchParams}
						/>
					</SearchContextProvider>
				</Suspense>
			</main>
		</>
	)
}
