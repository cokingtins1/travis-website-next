import Image from "next/image"
import Button from "@mui/material/Button"
import Link from "next/link"
import Divider from "@mui/material/Divider"
import FollowButtons from "./FollowButtons"
import { returnFileType } from "@/libs/utils"

export default function CheckoutOrder({ orderDetails, orderNumber, email }) {
	return (
		<div className=" flex flex-col items-center w-2/5 gap-4 mt-12 p-8 bg-bg-elevated rounded-lg">
			<div className="flex flex-col items-center">
				<h1 className="text-xl font-bold">
					Thank you for you purchase!
				</h1>
				<p>Order#: {orderNumber}</p>
				<p className="text-sm">
					An order confirmation has been sent to {email}{" "}
				</p>

				<p className="my-4">Click the links below to download:</p>
			</div>
			<Divider />
			<ul className="flex flex-col gap-4">
				{orderDetails.map((product, index) => (
					<li
						key={index}
						className="flex justify-between items-center gap-4"
					>
						<div className="flex gap-4">
							<div className="relative size-[100px] shrink-0">
								<Image
									src={product.imageSrc}
									fill={true}
									style={{ objectFit: "cover", borderRadius: '0.5rem' }}
									sizes="(max-width: 430px), 100px "
									alt="product image"
								/>
							</div>
							<div>
								<p>{product.productName}</p>
								<p className="text-text-secondary text-sm">
									by trav
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center gap-1">
							<Link
								className="whitespace-nowrap h-fit"
								href={product.signedUrl}
							>
								<Button variant="outlined">
									Download Link
								</Button>
							</Link>
							{/* <p className="text-xs text-text-secondary">
								{`(${returnFileType(product.productType)})`}
							</p> */}
						</div>
					</li>
				))}
			</ul>
			<FollowButtons />
			<div>
				<p className="text-xs text-text-secondary text-center px-12 mt-8">
					If you have any questions or are experiencing problems with
					the links provided, please email{" "}
					{
						<Link
							className="underline"
							href="mailto:cokingtins1@gmail.com"
						>
							cokingtins1@gmail.com
						</Link>
					}
				</p>
			</div>
		</div>
	)
}
