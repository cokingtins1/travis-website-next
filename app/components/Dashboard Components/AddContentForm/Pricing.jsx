import PricingSwitch from "./Upload Components/PricingSwitch"
import Switch from "@mui/material/Switch"
import { useState } from "react"

export default function Pricing({
	MP3_file,
	WAV_file,
	STEM_file,
	updateFields,
	basicPrice,
	premiumPrice,
	exclusivePrice,
	free,
}) {
	const [freeChecked, setFreeChecked] = useState(free)
	return (
		<>

			<div className="mt-4 flex flex-col gap-2">
				<p className="m-2 text-text-secondary">Regular</p>
				<PricingSwitch
					nameSwitch="basic"
					namePrice="basicPrice"
					defaultChecked={MP3_file}
					contractTitle={"Basic License"}
					contractSubtext={"MP3"}
					value={basicPrice}
					type={'MP3'}
					file={MP3_file}
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
					defaultChecked={WAV_file}
					contractTitle={"Premium License"}
					contractSubtext={"WAV, MP3"}
					value={premiumPrice}
					type={'WAV'}
					file={WAV_file}
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
			<div>
				<p className="m-2 py-2 text-text-secondary">Exclusive</p>
				<PricingSwitch
					nameSwitch="exclusive"
					namePrice="exclusivePrice"
					defaultChecked={STEM_file}
					contractTitle={"Exclusive License"}
					contractSubtext={"WAV, MP3, STEMS"}
					type={'STEM'}
					value={exclusivePrice}
					file={STEM_file}
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
