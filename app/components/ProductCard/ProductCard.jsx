import Link from "next/link"
import Divider from "@mui/material/Divider"

import {
	getAudioSrcById,
	getImageSrc,
	getLikes,
	getPricingById,
} from "@/libs/supabase/supabaseQuery"
import AddToCartBtn from "../UI/AddToCartBtn"
import ProductCardImage from "./ProductCardImage"
import LikeButton from "../Like Button/LikeButton"
import { useSession } from "@/libs/supabase/useSession"

export default async function ProductCard({ product }) {
	const { startingPrice, free } = await getPricingById(product.id)
	const imageSrc = await getImageSrc(product.id)
	const { storeSrc, storeSrcType } = await getAudioSrcById(product.id)
	const { likes } = await getLikes(product.id)

	const { session } = await useSession()

	if (!storeSrc) {
		return null
	}

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
							free={free}
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
								free={free}
							/>
						)}
						<LikeButton
							likes={likes}
							productId={product.id}
							session={session}
						/>
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
