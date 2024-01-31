import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export default function AddToCartBtn({ startingPrice }) {
	return (
		<>
			<button className="flex gap-2 border bg-bg-secondary text-sm rounded-md p-1">
				From ${startingPrice}
				<ShoppingCartIcon fontSize="small" />
			</button>
		</>
	)
}
