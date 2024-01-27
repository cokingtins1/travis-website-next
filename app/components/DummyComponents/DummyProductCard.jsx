import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"

export default function DummyProductCard({ title, id }) {
	return (
		<li className="flex flex-1 flex-col rounded hover:bg-bg-hover p-2">
			<Link href={`/dashboard/${id}`}>
				<Image src={beatKitImage} alt="product image"></Image>
			</Link>
			<p className="product-title">{title}</p>
			<p className="text-text-secondary">$9.99</p>
		</li>
	)
}
