"use client"

import { useShoppingCart } from "@/libs/contexts/CartContext"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export default function AddToCartBtn({ startingPrice, imageSrc, product }) {
	const { addToCart } = useShoppingCart()

	return (
		<>
			<button
				className="flex items-center gap-2 border bg-bg-secondary text-sm rounded-md p-1"
				onClick={() => {
					addToCart({
						pricing_id: startingPrice.pricing_id,
						product_id: startingPrice.product_id,
						product_name: product.title,
						price: startingPrice.price,
						type: startingPrice.name.toUpperCase(),
						imageSrc: imageSrc,
					})
				}}
			>
				From ${startingPrice.price}
				<ShoppingCartIcon fontSize="small" />
			</button>
		</>
	)
}
