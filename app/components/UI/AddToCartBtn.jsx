"use client"

import { useShoppingCart } from "@/libs/contexts/CartContext"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import DownloadIcon from "@mui/icons-material/Download"
import Tooltip from "@mui/material/Tooltip"
import FreeDownloadModal from "./FreeDownloadModal"
import { useState } from "react"

export default function AddToCartBtn({
	startingPrice,
	imageSrc,
	product,
	free = false,
}) {
	const { addToCart } = useShoppingCart()
	const [openModal, setOpenModal] = useState(false)

	return (
		<div className="flex gap-2">
			{openModal && (
				<FreeDownloadModal
					openModal={openModal}
					setModal={setOpenModal}
					productId={product.product_id}
					imageSrc={imageSrc}
				/>
			)}
			{free && (
				<>
					<Tooltip title={"Free tagged MP3 download"}>
						<button
							onClick={() => {
								setOpenModal(true)
							}}
							className="bg-bg-free rounded-md hover:ring-1 ring-white whitespace-nowrap px-2"
						>
							<DownloadIcon sx={{ fontSize: "1rem" }} />{" "}
							<span className="hidden md:inline pointer text-xs">
								FREE
							</span>
						</button>
					</Tooltip>
				</>
			)}
			<Tooltip title={"Add to cart"}>
				<button
					className="flex whitespace-nowrap items-center gap-2 border bg-bg-secondary hover:bg-bg-accent-khaki hover:text-black text-sm hover:ring-1 ring-white rounded-md p-1"
					onClick={() => {
						addToCart({
							pricing_id: startingPrice.pricing_id,
							product_id: product.product_id,
							product_name: product.title,
							price: startingPrice.price,
							type: startingPrice.type_id.toUpperCase(),
							imageSrc: imageSrc,
						})
					}}
				>
					<p className="hidden md:block">From ${startingPrice.price}</p>
					<ShoppingCartIcon fontSize="small" />
				</button>
			</Tooltip>
		</div>
	)
}
