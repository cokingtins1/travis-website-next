import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import { getImageSrc } from "@/libs/supabase/supabaseQuery"

export default async function DashboardProductCard({ product }) {
	const imageSrc = await getImageSrc(product.upload_id)

	return (
		<li className="flex flex-1 flex-col items-center justify-center rounded hover:bg-bg-hover p-2">
			<Link href={`/dashboard/${product.id}`} className='flex'>
				<Image
					src={imageSrc ? imageSrc : beatKitImage}
					width={90}
					height={90}
					alt="product image"
				/>
			</Link>
			<p className="product-title">{product.title}</p>
		</li>
	)
}
