import { notFound } from "next/navigation";
import ProductSection from "../components/Store Components/ProductSection";
import { SearchContextProvider } from "@/libs/contexts/SearchContext";
import { constructData } from "@/libs/supabase/supabseStoreData";
import { Suspense } from "react";
import StoreSkeleton from "../components/Skeletons/StoreSkeleton";
import revalidate from "../actions/revalidate";

export default async function Store({ searchParams }) {
	revalidate();
	const data = await constructData();

	if (!data) {
		notFound();
	}

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full">
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
	);
}
