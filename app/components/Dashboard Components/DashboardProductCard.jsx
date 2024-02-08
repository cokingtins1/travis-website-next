import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import { getImageSrc } from "@/libs/supabase/supabaseQuery"

export default async function DashboardProductCard({ product, index }) {
	const imageSrc = await getImageSrc(product.upload_id)

	return (
		<li className="w-full items-center grid rounded hover:bg-bg-hover px-8 py-2" style={{gridTemplateColumns: '2% 36% 24% 20% 18%'}}>
			<p className='text-sm text-text-secondary'>{index + 1}</p>
			<Link href={`/dashboard/${product.id}`} className='flex gap-4 justify-start items-center'>
				<Image
					src={imageSrc ? imageSrc : beatKitImage}
					width={35}
					height={35}
					alt="product image"
				/>
			<p className="text-sm">{product.title}</p>
			</Link>
			<p className="text-sm">{product.release_date_long}</p>
			<p className="text-sm">{product.title}</p>
			<p>balls</p>
		</li>
	)
}
