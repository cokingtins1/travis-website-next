import Image from "next/image"
import ClearIcon from "@mui/icons-material/Clear"
import { formatCurrency } from "@/libs/utils"
import { useShoppingCart } from "@/libs/contexts/CartContext"

export default function CartItem({ cartItem }) {
	const { pricing_id, imageSrc, product_name, price, type } = cartItem

	const { removeFromCart } = useShoppingCart()

	return (
		<li>
			<div className="flex items-center gap-4">
				<div className="w-[50px] h-[50px] relative">
					<Image
						className="rounded-sm"
						src={imageSrc}
						fill={true}
						style={{ objectFit: "cover" }}
						sizes="(max-width: 430px), 50px "
						alt="product image"
					/>
				</div>
				<div className="flex items-center w-full">
					<p className="text-text-primary text-sm w-9/12 pr-4">
						{product_name} 
						<span className='font-bold'>{` (${type})`}</span>
					</p>
					<p className="text-text-primary text-sm">
						{formatCurrency(price)}
					</p>
					<span className="text-text-secondary pl-4">
						<button
							onClick={() => removeFromCart(pricing_id)}
							className="rounded-md hover:bg-bg-hover p-1"
						>
							<ClearIcon fontSize="small" />
						</button>
					</span>
				</div>
			</div>
		</li>
	)
}
