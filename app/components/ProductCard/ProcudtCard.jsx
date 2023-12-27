import Image from "next/image"
import beatKitImage from "@/public/beatKitImage.jpg"

export default function ProductCard() {
	return (
		<>
			<div className="flex flex-1 flex-col">
				<Image src={beatKitImage} alt="product image"></Image>
				<div className="product-title">
					Dope Drum Kit With Fire Beats
				</div>
				<div className="cost">$29.99</div>
			</div>
		</>
	)
}
