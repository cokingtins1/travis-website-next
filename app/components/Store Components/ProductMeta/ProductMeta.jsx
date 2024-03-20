import styles from "./styles.module.css"
import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import Divider from "@mui/material/Divider"
import { getLikes } from "@/libs/supabase/supabaseQuery"
import LikeButton from "../../Like Button/LikeButton"
import { formatLarge } from "@/libs/utils"
import ShareButton from "../ShareComponent/ShareButton"

export default async function ProductMeta({ product, imageSrc }) {
	const { likes } = await getLikes(product.product_id)

	const formattedPlays = formatLarge(product.plays)

	return (
		<>
			<div className="bg-bg-elevated rounded-xl p-4">
				<div className="flex flex-col justify-center items-center gap-4 ">
					<div className="h-[300px] w-[250px] relative">
						<Image
							priority={true}
							src={imageSrc ? imageSrc : beatKitImage}
							alt="product image"
							fill={true}
							style={{ objectFit: "cover", borderRadius: "10px" }}
							sizes="(max-width: 430px), 250px"
						/>
					</div>
					<h1 className="text-2xl text-center">{product.title}</h1>
				</div>

				<div className={styles.metaInfo}>
					<div className="flex justify-center gap-1 mt-1 mb-2">
						<LikeButton
							productId={product.product_id}
							likes={likes}
						/>
						<ShareButton imageSrc={imageSrc ? imageSrc : beatKitImage} product={product} />
					</div>

					<Divider />
					<div className={styles.productInfo}>
						<h3 className="">INFORMATION</h3>
						<p>
							<span>Published</span>
							<span>{product.release_date_long}</span>
						</p>
						<p>
							<span>BPM</span>
							<span>{product.bpm}</span>
						</p>
						<p>
							<span>Plays</span>
							<span>{formattedPlays}</span>
						</p>
					</div>

					<Divider />
					<div className={styles.productAbout}>
						<h3 className="text-sm">TAGS</h3>
						<div className="flex gap-2 flex-wrap">
							{product.tags.map((tag, index) => (
								<p
									key={index}
									className="bg-bg-secondary text-sm px-4 py-1 rounded-2xl whitespace-nowrap"
								>
									{`#${tag}`}
								</p>
							))}
						</div>
					</div>
					<Divider />
					<div className={styles.productAbout}>
						<h3 className="text-sm">ABOUT</h3>

						<p className="text-sm">{product.description}</p>
						<div className="flex gap-2 flex-wrap"></div>
					</div>
				</div>
			</div>
		</>
	)
}
