import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { getStartingPrice } from "@/libs/supabase/supabaseQuery"
import AddToCartBtn from "../UI/AddToCartBtn"

export default async function NewProductCard({ product }) {
	const startingPrice = await getStartingPrice(product.id)

	return (
		<>
			<div>
				<li className="border border-bg-base hover:bg-bg-elevated hover:border-border-primary rounded-lg flex justify-between gap-2 p-4">
					<Link href={`/store/${product.id}`}>
						<div className="flex gap-4">
							<figure className="relative flex flex-col items-center">
								<Image
									src={beatKitImage}
									width={90}
									alt="product image"
								/>
								<figcaption className="absolute bottom-0 text-xs bg-bg-secondary rounded p-1">
									{product.bpm} BPM
								</figcaption>
							</figure>
							<div>
								<p>{product.title}</p>
								<p className="text-sm text-text-secondary">
									{product.bpm} BPM
								</p>
								<p className="text-sm text-text-secondary">
									{product.genres.map((g, index) => (
										<span key={index}> &#8226; {g} </span>
									))}
								</p>
								<p className="text-sm text-text-secondary">
									tag1 tag2 tag3
								</p>
							</div>
						</div>
					</Link>
					<div className="flex flex-col justify-center items-end">
						<AddToCartBtn startingPrice={startingPrice} />
						<div>
							<IconButton>
								<FavoriteBorderIcon />
							</IconButton>
						</div>
						<button className="text-text-secondary text-lg font-bold">
							...
						</button>
					</div>
				</li>
				<Divider />
			</div>
		</>
	)
}
