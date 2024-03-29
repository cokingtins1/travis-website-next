"use client";

import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import FollowButtons from "./FollowButtons";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function CheckoutOrder({ orderDetails }) {
	const router = useRouter();
	if (orderDetails?.length === 0) {
		router.refresh();
	}

	let expiration = null;
	if (orderDetails[0]?.orderDate) {
		expiration = dayjs(orderDetails[0]?.orderDate)
			.add(7, "day")
			.format("MMMM D, YYYY [at] h:mm A");
	}

	return (
		<div className=" flex flex-col items-center w-2/5 gap-4 mt-12 p-8 bg-bg-elevated rounded-lg">
			<div className="flex flex-col items-center">
				<h1 className="text-xl font-bold">
					Thank you for you purchase!
				</h1>
				<p>Order#: {orderDetails[0].orderAlias}</p>
				<p className="text-sm">
					An order confirmation has been sent to{" "}
					{orderDetails[0].customerEmail}{" "}
				</p>

				<p className="mt-4">Click the links below to download:</p>
				<p className="text-xs text-balance text-center text-text-secondary">{`Each link will expire in 7 days`}</p>
				{expiration && (
					<p className="text-xs text-balance text-center text-text-secondary">{`You have until ${expiration} to download your files`}</p>
				)}
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
									style={{
										objectFit: "cover",
										borderRadius: "0.5rem",
									}}
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
							href="mailto:beatsmadebytrav@gmail.com"
						>
							beatsmadebytrav@gmail.com
						</Link>
					}
				</p>
			</div>
		</div>
	);
}
