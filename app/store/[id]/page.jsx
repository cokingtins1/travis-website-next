import CustomDivider from "@/app/components/MUI/Divider"
import PricingButton from "@/app/components/Pricing Component/PricingButton"
import ProductMeta from "@/app/components/ProductMeta/ProductMeta"
import { Button } from "@/app/components/UI/Button"
import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { notFound } from "next/navigation"

export default async function Page({ params: { id } }) {
	const { data: product } = await supabaseClient
		.from("products")
		.select("*")
		.match({ id })
		.single()

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
					<div className='flex flex-col gap-4 p-4'>
						<div className="flex justify-between items-center ">
							<h1>Liscensing</h1>
							<div className="flex gap-4">
								<div>
									<p>TOTAL:</p>
									<h2>$29.99</h2>
								</div>
								<Button>Add to Cart</Button>
							</div>
						</div>
						<CustomDivider />
						<div>
							<PricingButton product={product} />
							<PricingButton product={product} />
							<PricingButton product={product} />
							<PricingButton product={product} />
							<PricingButton product={product} />
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
