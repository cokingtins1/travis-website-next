"use client";

import Divider from "@mui/material/Divider";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import Button from "@mui/material/Button";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UsageTerms from "./UsageTerms";
import { useShoppingCart } from "@/libs/contexts/CartContext";
import { formatCurrency } from "@/libs/utils";

export default function PricingSection({ product, pricing, imageSrc }) {
	const { addToCart } = useShoppingCart();

	const [selected, setSelected] = useState("");
	const [cartTotal, setCartTotal] = useState(() => formatCurrency(0));

	const [selectedProduct, setSelectedProduct] = useState({
		product_id: null,
		pricing_id: null,
		product_name: null,
		type: null,
		price: null,
	});

	if (!pricing) {
		return null;
	}

	function getFileType(name) {
		let fileType;
		switch (name) {
			case "basic":
				fileType = "MP3";
				break;
			case "premium":
				fileType = "WAV (Untagged)";
				break;
			case "exclusive":
				fileType = "WAV + STEMS (Untagged)";
				break;
			default:
				fileType = "";
		}

		return fileType;
	}

	function PricingButton(name, price, pricing_id, product_id) {
		return (
			<button
				key={pricing_id}
				type="button"
				value={price}
				className={`flex items-center border rounded-xl p-4 w-1/3 ${
					selected === name
						? "border-border-btn-select bg-bg-btn-select hover:none "
						: "border-border-primary hover:bg-bg-hover"
				}  `}
				onClick={() => {
					setSelected(name);
					setSelectedProduct((prev) => {
						return {
							...prev,
							product_id: product_id,
							pricing_id: pricing_id,
							product_name: product.title,
							type: name.toUpperCase(),
							price: price,
						};
					});

					setCartTotal(() => formatCurrency(price));
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
		);
	}

	return (
		<>
			<div className="flex flex-col gap-4 p-4 bg-bg-elevated rounded-xl">
				<div className="flex justify-between items-center">
					<p className="text-xl">Liscensing</p>

					<div className="flex gap-4">
						<div>
							<p className="text-sm text-text-secondary text-end">
								TOTAL:
							</p>
							<h2>{`${cartTotal}`}</h2>
						</div>
						<Button
							onClick={() => {
								if (selected) {
									addToCart({
										pricing_id: selectedProduct.pricing_id,
										product_id: selectedProduct.product_id,
										product_name:
											selectedProduct.product_name,
										price: selectedProduct.price,
										type: selectedProduct.type,
										imageSrc: imageSrc,
									});
								}
							}}
							type="button"
						>
							Add to Cart
						</Button>
					</div>
				</div>
				<Divider />
				<div className="flex gap-4">
					{pricing.map((item) =>
						PricingButton(
							item.name, //basic, premium, exclusive
							item.price,
							item.pricing_id,
							item.product_id
						)
					)}
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
							Usage Terms{" "}
							{selected && (
								<span className="font-semibold">{`: (${selected.toUpperCase()})`}</span>
							)}
						</AccordionSummary>
						<AccordionDetails sx={{ backgroundColor: "#121212" }}>
							<UsageTerms selected={selected} />
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		</>
	);
}
