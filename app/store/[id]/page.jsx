import PricingSection from "@/app/components/Pricing Component/PricingButton"
import ProductMeta from "@/app/components/ProductMeta/ProductMeta"
import { getProductById } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
// import supabaseClient from "@/libs/supabase/config/supabaseClient"

// export async function generateStaticParams() {
// 	const { data: products } = await supabaseClient
// 		.from("products")
// 		.select("id")
// 	return products ?? []
// }

export default async function Page({ params: { id } }) {
	const product = await getProductById(id)

	if (!product) {
		notFound()
	}

	return (
		<>
			<main className="grid grid-cols-12 px-4 pt-4">
				<div className="col-span-3 px-10">
					<ProductMeta product={product} />
				</div>

				<div className="col-span-9 bg-bg-elevated">
					<PricingSection price={product.price} />
				</div>
			</main>
		</>
	)
}
