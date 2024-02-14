import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { getImageSrc, getPricingById } from "@/libs/supabase/supabaseQuery"
import AddToCartBtn from "../UI/AddToCartBtn"

export default async function NewProductCard({ product }) {
	const { startingPrice } = await getPricingById(product.id)
	const imageSrc = await getImageSrc(product.upload_id)

	return (
		<>
			<div>
				<li className="border border-bg-base hover:bg-bg-elevated hover:border-border-primary rounded-lg flex justify-between gap-2 p-4">
					<Link href={`/store/${product.id}`}>
						<div className="flex gap-4">
							<figure className="relative flex flex-col items-center h-[85px] w-[85px]">
								<Image
									src={imageSrc ? imageSrc : beatKitImage}
									className="rounded-sm"
									fill={true}
									style={{ objectFit: "cover" }}
									sizes="(max-width: 430px), 85px "
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
									{product.tags.map((g, index) => (
										<span key={index}>{g} </span>
									))}
								</p>
							</div>
						</div>
					</Link>
					<div className="flex flex-col justify-center items-end whitespace-nowrap">
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
