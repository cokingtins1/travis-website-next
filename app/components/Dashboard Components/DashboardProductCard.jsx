import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import { getImageSrc } from "@/libs/supabase/supabaseQuery"

export default async function DashboardProductCard({ product, index }) {
	const imageSrc = await getImageSrc(product.product_id)

	return (
		<li
			className="w-full items-center grid rounded hover:bg-bg-hover px-8 py-2"
			style={{ gridTemplateColumns: "3% 55% 13% 15% 14%" }}
		>
			<p className="text-sm text-text-secondary">{index + 1}</p>
			<Link
				href={`/dashboard/${product.product_id}`}
				className="flex gap-4 justify-start items-center"
			>
				<div className="relative size-[40px]">
					<Image
						src={imageSrc ? imageSrc : beatKitImage}
						className="rounded-sm"
						fill={true}
						style={{ objectFit: "cover" }}
						sizes="(max-width: 430px), 40px "
						alt="product image"
					/>
				</div>
				<p className="text-sm">{product.title}</p>
			</Link>
			<p className="text-sm">{product.release_date_long}</p>
			<p className="text-sm">hello</p>
			<p>balls</p>
		</li>
	)
}
