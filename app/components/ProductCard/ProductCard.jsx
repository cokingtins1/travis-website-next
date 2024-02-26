import Link from "next/link"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import {
	getAudioSrcById,
	getImageSrc,
	getPricingById,
} from "@/libs/supabase/supabaseQuery"
import AddToCartBtn from "../UI/AddToCartBtn"
import ProductCardImage from "./ProductCardImage"

export default async function ProductCard({ product }) {
	const { startingPrice } = await getPricingById(product.id)
	const imageSrc = await getImageSrc(product.id)
	const { storeSrc, storeSrcType } = await getAudioSrcById(product.id)


	return (
		<>
			<li>
				<div className="border border-bg-base hover:bg-bg-elevated hover:border-border-primary rounded-lg flex justify-between gap-2 p-4">
					<div className="flex gap-4">
						<ProductCardImage
							imageSrc={imageSrc}
							audioSrc={storeSrc}
							product={product}
							startingPrice={startingPrice}
							srcType={storeSrcType}
						/>
						<Link href={`/store/${product.id}`}>
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
						</Link>
					</div>
					<div className="flex flex-col justify-center items-end whitespace-nowrap">
						{startingPrice && (
							<AddToCartBtn
								startingPrice={startingPrice}
								imageSrc={imageSrc}
								product={product}
							/>
						)}
						<div>
							<IconButton>
								<FavoriteBorderIcon />
							</IconButton>
						</div>
						<button className="text-text-secondary text-lg font-bold">
							...
						</button>
					</div>
				</div>
				<Divider />
			</li>
		</>
	)
}
