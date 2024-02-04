import PricingSwitch from "./Upload Components/PricingSwitch"
import Switch from "@mui/material/Switch"
import { useState } from "react"

export default function Pricing({
	updateFields,
	basic,
	basicPrice,
	premium,
	premiumPrice,
	exclusive,
	exclusivePrice,
	free,
}) {
	const [freeChecked, setFreeChecked] = useState(free)
	return (
		<>
			<div>
				<p className="m-2 text-text-secondary">Exclusive</p>
				<PricingSwitch
					nameSwitch="exclusive"
					namePrice="exclusivePrice"
					defaultChecked={exclusive}
					contractTitle={"Exclusive License"}
					contractSubtext={"WAV, MP3, STEMS"}
					value={exclusivePrice}
					onCheckedChange={(newChecked) => {
						updateFields({
							exclusive: newChecked,
						})
					}}
					onChange={(newPrice) => {
						updateFields({
							exclusivePrice: newPrice,
						})
					}}
				/>
			</div>
			<div className="mt-4 flex flex-col gap-2">
				<p className="m-2 text-text-secondary">Regular</p>
				<PricingSwitch
					nameSwitch="basic"
					namePrice="basicPrice"
					defaultChecked={basic}
					contractTitle={"Basic License"}
					contractSubtext={"MP3"}
					value={basicPrice}
					onCheckedChange={(newChecked) => {
						updateFields({
							basic: newChecked,
						})
					}}
					onChange={(newPrice) => {
						updateFields({
							basicPrice: newPrice,
						})
					}}
				/>
				<PricingSwitch
					nameSwitch="premium"
					namePrice="premiumPrice"
					defaultChecked={premium}
					contractTitle={"Premium License"}
					contractSubtext={"WAV, MP3"}
					value={premiumPrice}
					onCheckedChange={(newChecked) => {
						updateFields({
							premium: newChecked,
						})
					}}
					onChange={(newPrice) => {
						updateFields({
							premiumPrice: newPrice,
						})
					}}
				/>
			</div>
			<div className="mt-4 flex flex-col gap-2">
				<p className="m-2 text-text-secondary">Free</p>
				<div className="flex items-center rounded-lg border border-border-primary p-2">
					<span className="flex items-center p-2">
						<Switch
							name="free"
							checked={freeChecked}
							value={freeChecked}
							onChange={() => {
								setFreeChecked(!freeChecked)
								updateFields({
									free: !freeChecked,
								})
							}}
						/>
					</span>
					<div>
						<p className="font-semibold">Free</p>
						<p className="text-sm text-text-secondary">
							Tagged MP3
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
