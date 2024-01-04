import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"

export default async function ProductCard({ products }) {
	return (
		<>
			{products.map((p, index) => (
				<li key={index} className="flex flex-1 flex-col">
					<Link href={`product/${p._id}`}>
						<Image src={beatKitImage} alt="product image"></Image>
					</Link>
					<p className="product-title">{p.productName}</p>
					<p className="cost">{p.cost}</p>
				</li>
			))}

			{/* <div className="flex flex-1 flex-col">
				<Link href={"/id"}>
					<Image src={beatKitImage} alt="product image"></Image>
				</Link>
				<p className="product-title">Dope Beat Kit</p>
				<p className="cost">$29.99</p>
			</div> */}
		</>
	)
}
