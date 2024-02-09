"use client"

import Divider from "@mui/material/Divider"
import { useState } from "react"
import { Button } from "../../UI/Button"
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import UsageTerms from "./UsageTerms"

export default function PricingSection({ pricing }) {
	const [selected, setSelected] = useState("")
	const [cartTotal, setCartTotal] = useState(() => formatCurrency(0))

	if (!pricing) {
		return null
	}

	function formatCurrency(amount) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount)
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

	function PricingButton(name, price) {
		return (
			<button
				value={price}
				className={`flex items-center border rounded-xl p-4 flex-1 ${
					selected === name
						? "border-border-btn-select bg-bg-btn-select hover:none "
						: "border-border-primary hover:bg-bg-hover"
				}  `}
				onClick={() => {
					setSelected(name)
					setCartTotal(() => formatCurrency(price))
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
			<div className="flex flex-col gap-4 p-4 bg-bg-elevated rounded-xl">
				<div className="flex justify-between items-center ">
					<p className='text-xl'>Liscensing</p>
					<div className="flex gap-4">
						<div>
							<p className="text-sm text-text-secondary text-end">
								TOTAL:
							</p>
							<h2>{`${cartTotal}`}</h2>
						</div>
						<Button>Add to Cart</Button>
					</div>
				</div>
				<Divider />
				<div className="flex gap-4">
					{pricing.basic &&
						PricingButton("basic", pricing.basic_price)}
					{pricing.premium &&
						PricingButton("premium", pricing.premium_price)}
					{pricing.exclusive &&
						PricingButton("exclusive", pricing.exclusive_price)}
				</div>
				<Divider />
				<div>
					<Accordion sx={{ boxShadow: "none" }}>
						<AccordionSummary
							sx={{
								backgroundColor: "#121212",
								paddingLeft: 0,
								paddingRight: 0,
							}}
							expandIcon={<ExpandMoreIcon />}
						>
							Usage Terms
						</AccordionSummary>
						<AccordionDetails sx={{ backgroundColor: "#121212" }}>
							<UsageTerms />
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		</>
	)
}
