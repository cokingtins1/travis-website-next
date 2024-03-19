import Link from "next/link"
import Divider from "@mui/material/Divider"

import AddToCartBtn from "../UI/AddToCartBtn"
import ProductCardImage from "./ProductCardImage"
import LikeButton from "../Like Button/LikeButton"
import { submitLike } from "@/app/actions/submitLike"
import { formatLarge, getAudioFile } from "@/libs/utils"

export default function ProductCard({ productData, audioList }) {
	const product = productData.product_data
	const startingPrice = productData.startingPrice
	const free = productData.isFree
	const imageSrc = productData.product_data.image_name
	const likes = productData.product_likes.likes
	const likedByUser = productData.likedByUser

	const session = productData.session

	const [storeSrc, storeSrcType] = getAudioFile(productData.product_files)

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
							audioList={audioList}
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

						<p className="text-xs text-text-secondary">
							{formatLarge(productData.product_data.plays)} plays
						</p>
					</div>
				</div>
				<Divider />
			</li>
		</>
	)
}
