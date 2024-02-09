import Image from "next/image"

export default function CartItem({ cartItem }) {
	const { id, imageSrc, title, type, price } = cartItem

	return (
		<li>
			<div className="flex items-center gap-4">
				<Image src={imageSrc} width={50} height={50} alt="" />
				<p className='text-text-primary text-sm'>{title}</p>
			</div>
		</li>
	)
}
