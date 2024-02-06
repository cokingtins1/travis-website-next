"use client"

import Divider from "@mui/material/Divider"
import { useState } from "react"
import { Button } from "../UI/Button"

export default function PricingSection({ pricing }) {
	const [selected, setSelected] = useState(null)
	const [cartTotal, setCartTotal] = useState("0.00")

	if (!pricing) {
		return null
	}

	

	function getFileType(name) {
		let fileType
		switch (name) {
			case "basic":
				fileType = "MP3"
				break
			case "premium":
				fileType = "MP3, WAV"
				break
			case "exclusive":
				fileType = "MP3, WAV, STEMS"
				break
			default:
				fileType = ""
		}

		return fileType
	}

	console.log("pricing", pricing)

	const renderedPricing = () => {
		console.log("pricing.basic", pricing.basic)
		if (pricing.basic == true) {
			PricingButton(1, "basic", pricing.basic_price)
		}

		// if (item.checked) {
		// 	return PricingButton(index, key, item.price)
		// }
	}

	function PricingButton(index, name = key, price) {
		return (
			<button
				key={index}
				id={index}
				value={price}
				className={`w-80 h-20 flex items-center border rounded-xl hover:bg-bg-hover  ${
					selected === index
						? "border-border-btn-select bg-bg-btn-select hover:none "
						: "border-border-primary"
				}  p-4`}
				onClick={() => {
					setSelected(index)
					setCartTotal(price)
				}}
			>
				<div className="flex flex-col items-start">
					<p className="text-sm font-bold">{name.toUpperCase()}</p>
					<p className="text-sm">{`$${price}`}</p>
					<p className="text-xs text-text-secondary">
						{getFileType(name)}
					</p>
				</div>
			</button>
		)
	}

	return (
		<>
			<div className="flex flex-col gap-4 p-4">
				<div className="flex justify-between items-center ">
					<h1>Liscensing</h1>
					<div className="flex gap-4">
						<div>
							<p>TOTAL:</p>
							<h2>{`$${cartTotal}`}</h2>
						</div>
						<Button>Add to Cart</Button>
					</div>
				</div>
				<Divider />
				<div className="flex gap-4 flex-wrap">{PricingButton(1, 'basic', pricing.basic_price)}</div>
			</div>
		</>
	)
}
