import Link from "next/link"
import Divider from "@mui/material/Divider"

import {
	getAudioSrcById,
	getImageSrc,
	getLikes,
	getPricingById,
	getLikedByUser,
} from "@/libs/supabase/supabaseQuery"
import AddToCartBtn from "../UI/AddToCartBtn"
import ProductCardImage from "./ProductCardImage"
import LikeButton from "../Like Button/LikeButton"
import { useSession } from "@/libs/supabase/useSession"
import { submitLike } from "@/app/actions/submitLike"

export default async function ProductCard({ productData }) {
	// const { startingPrice, free } = await getPricingById(product.product_id)
	// const imageSrc = await getImageSrc(product.product_id)
	// const { storeSrc, storeSrcType } = await getAudioSrcById(product.product_id)
	// const { likes } = await getLikes(product.product_id)

	// const data = await getLikes(product.product_id)
	// const likes = data?.likes

	const product = productData.product_data
	const startingPrice = productData.startingPrice
	const free = productData.isFree
	const imageSrc = productData.imageSrc
	const storeSrc = productData.storeSrc
	const storeSrcType = productData.storeSrcType
	const likes = productData.likes
	const likedByUser = productData.likedByUser

	const session = productData.session
	
	// console.log("productData", likedByUser)
	// const { session } = await useSession()
	// const likedByUser = await getLikedByUser(
	// 	session?.user.id,
	// 	product.product_id
	// )

	// if (!storeSrc) {
	// 	return null
	// }

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
						<Link href={`/store/${product.product_id}`}>
							<div>
								<p>{product.title}</p>
								<p className="text-sm text-text-secondary">
									{product.bpm} BPM
								</p>
								<p className="text-sm text-text-secondary">
									{product.genres.map((g, index, array) => (
										<span key={index}>
											{g}{" "}
											{index !== array.length - 1 &&
												" • "}{" "}
										</span>
									))}
								</p>
								<p className="text-sm text-text-secondary">
									{product.tags.map((tag, index, array) => (
										<span key={index}>
											{tag}
											{index !== array.length - 1 &&
												" / "}{" "}
										</span>
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
							likeId={product.product_id}
							product_id={product.product_id}
							session={session}
							likedByUser={likedByUser}
							submitCallback={submitLike}
							variant={"left"}
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
