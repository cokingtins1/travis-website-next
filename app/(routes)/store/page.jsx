import { notFound } from "next/navigation";
import ProductSection from "@/app/components/Store Components/ProductSection";
import { SearchContextProvider } from "@/libs/contexts/SearchContext";
import { constructData } from "@/libs/supabase/supabseStoreData";
import { Suspense } from "react";
import StoreSkeleton from "@/app/components/Skeletons/StoreSkeleton";
import revalidate from "@/app/actions/revalidate";

export default async function Store({ searchParams }) {
	revalidate(["dashboardData", "products"]);
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
