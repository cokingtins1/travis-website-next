import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import Divider from "@mui/material/Divider"
import { getStartingPrice } from "@/libs/supabase/supabaseQuery"

export default async function ProductCard({ product }) {
	const fromPrice = await getStartingPrice(product.product_id)

	return (
		<>
			<Link href={`/store/${product.product_id}`}>
				<li className="border border-bg-base hover:bg-bg-elevated hover:border-border-primary rounded-lg flex flex-1 flex-col p-4">
					<Image src={beatKitImage} alt="product image"></Image>
					<p className="product-title">{product.title}</p>
					<Divider />
					<p className="text-sm text-text-secondary">
						From ${fromPrice && fromPrice}
					</p>
				</li>
			</Link>
		</>
	)
}
