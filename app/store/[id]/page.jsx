import Comments from '@/app/components/Store Components/Comments Component/Comments'
import ProductMedia from "@/app/components/Store Components/Media Components/ProductMedia"
import PricingSection from "@/app/components/Store Components/Pricing Component/PricingSection"
import ProductMeta from "@/app/components/Store Components/ProductMeta/ProductMeta"
import {
	getImageSrc,
	getPricingById,
	getProductById,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function Page({ params: { id } }) {
	const product = await getProductById(id)
	const imageSrc = await getImageSrc(product.upload_id)
	const pricing = await getPricingById(id)

	// add url to database and write function to grab it

	if (!product) {
		notFound()
	}

	const mediaMain = {
		lg: "lg:grid-cols-12",
	}

	const mediaMeta = {
		lg: "lg:col-span-4 px-2",
	}

	const mediaPricing = {
		lg: "lg:col-span-8 px-2",
	}

	return (
		<>
			<main
				className={`grid grid-cols-8 px-4 pt-4 gap-4 ${mediaMain.lg} `}
			>
				<section className={`grid content-start col-span-8 px-10 ${mediaMeta.lg} `}>
					<ProductMeta imageSrc={imageSrc} product={product} />
				</section>

				<section
					className={`grid content-start col-span-8 px-10 gap-4 ${mediaPricing.lg} `}
				>
					<PricingSection pricing={pricing} />
					<section>
						<Comments/>
					</section>

					<Suspense fallback={<p>Loading video...</p>}>
						<ProductMedia url="btyS_uiRLnU" />
					</Suspense>
				</section>
			</main>
		</>
	)
}
