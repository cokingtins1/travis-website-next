
import SearchComponent from "../components/SearchBar/SearchComponent"
import { getAllProductData } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import ProductSection from "../components/Store Components/ProductSection"
import { SearchContextProvider } from "@/libs/contexts/SearchContext"
import { constructData } from "@/libs/supabase/supabseStoreData"
import { Suspense } from "react"
import StoreSkeleton from "../components/Skeletons/StoreSkeleton"

export default async function Store({ searchParams }) {
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


	const data = await constructData()
	if (!data) {
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
							data={data}
							searchParams={searchParams}
						/>
					</SearchContextProvider>
				</Suspense>
			</main>
		</>
	)
}
