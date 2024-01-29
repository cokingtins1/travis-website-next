import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"

export default async function ProductCard({ product }) {
	return (
		<>
			<li className="flex flex-1 flex-col">
				<Link href={`/store/${product.id}`}>
					<Image src={beatKitImage} alt="product image"></Image>
				</Link>
				<p className="product-title">{product.title}</p>
				<p className="cost">$5.99</p>
			</li>
		</>
	)
}
