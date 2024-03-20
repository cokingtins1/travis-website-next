import Image from "next/image"
import AddToCartBtn from "../UI/AddToCartBtn"
import beatKitImage from "@/public/beatKitImage.jpg"
import { useAudio } from "@/libs/contexts/AudioContext"

export default function AudioProductSection({
	imageSrc,
	product = null,
	startingPrice = null,
	free = false,
}) {
	const { file } = useAudio()
	return (
		<div className="flex justify-self-start gap-4">
			{imageSrc && (
				<div className="size-[75px] relative">
					<Image
						src={imageSrc || beatKitImage}
						fill
						sizes="(max-width: 430px), 75px "
						alt="product image"
					/>
				</div>
			)}
			<div className='hidden sm:block'>
				<p className="text-sm text-text-primary">
					{product?.title || file?.fileName}
				</p>
				<p className="text-sm text-text-secondary">
					{product?.description || file?.fileSize}
				</p>
			</div>
			{product && startingPrice && (
				<div className="hidden lg:block">
					{startingPrice && (
						<AddToCartBtn
							startingPrice={startingPrice}
							imageSrc={imageSrc}
							product={product}
							free={free}
						/>
					)}
				</div>
			)}
		</div>
	)
}
