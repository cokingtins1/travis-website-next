import PricingSection from "@/app/components/Pricing Component/PricingButton"
import ProductMeta from "@/app/components/ProductMeta/ProductMeta"
import { getImageSrc, getProductById } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"

export default async function Page({ params: { id } }) {
	const product = await getProductById(id)
	const imageSrc = await getImageSrc(product.upload_id)

	if (!product) {
		notFound()
	}

	return (
		<>
			<main className="grid grid-cols-12 px-4 pt-4">
				<div className="col-span-3 px-10">
					<ProductMeta imageSrc={imageSrc} product={product} />
				</div>

				<div className="col-span-9 bg-bg-elevated">
					<PricingSection price={product.price} />
				</div>
			</main>
		</>
	)
}
