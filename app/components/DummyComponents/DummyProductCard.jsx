import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"

export default function DummyProductCard() {
	return (
		<li className="flex flex-1 flex-col rounded hover:bg-bg-hover p-2">
			<Link href={"/studio"}>
				<Image src={beatKitImage} alt="product image"></Image>
			</Link>
			<p className="product-title">Dope Beat Kit</p>
			<p className="text-text-secondary">$9.99</p>
		</li>
	)
}
