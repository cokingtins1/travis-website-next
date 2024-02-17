import Comments from "@/app/components/Store Components/Comments Component/Comments"
import ProductMedia from "@/app/components/Store Components/Media Components/ProductMedia"

import ProductMeta from "@/app/components/Store Components/ProductMeta/ProductMeta"
import {
	getImageSrc,
	getPricingById,
	getProductById,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import dynamic from "next/dynamic"

export default async function Page({ params: { id } }) {
	const product = await getProductById(id)
	const imageSrc = await getImageSrc(id)
	const { pricing } = await getPricingById(id)

	// add url to database and write function to grab it

	const DynamicPricing = dynamic(
		() =>
			import(
				"@/app/components/Store Components/Pricing Component/PricingSection"
			),
		{
			ssr: false,
		}
	)

	if (!product) {
		notFound()
	}

	const media = {
		mainLg: "lg:grid-cols-12",
		metaLg: "lg:col-span-3 px-2",
		pricingLg: "lg:col-span-9 px-2",
	}

	return (
		<>
			<main
				className={`grid grid-cols-8 px-4 pt-4 gap-4 ${media.mainLg} `}
			>
				<section
					className={`grid content-start col-span-8 px-10 ${media.metaLg} `}
				>
					<ProductMeta imageSrc={imageSrc} product={product} />
				</section>

				<section
					className={`grid content-start col-span-8 px-10 gap-4 ${media.pricingLg} `}
				>
					<DynamicPricing
						product={product}
						pricing={pricing}
						imageSrc={imageSrc}
					/>
					<section>
						<Comments />
					</section>

					<Suspense fallback={<p>Loading video...</p>}>
						{/* <ProductMedia url="btyS_uiRLnU" /> */}
					</Suspense>
				</section>
			</main>
		</>
	)
}
