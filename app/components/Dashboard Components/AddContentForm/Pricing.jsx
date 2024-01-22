import PricingSwitch from "./Upload Components/PricingSwitch"

export default function Pricing({ updateFields, price }) {
	return (
		<>
			<div>
				<p className="m-2 text-text-secondary">Exclusive</p>
				<PricingSwitch
					defaultChecked={price.exclusive.checked}
					contractTitle={"Exclusive License"}
					contractSubtext={"WAV, MP3, STEMS"}
					value={price.exclusive.price}
					onCheckedChange={(newChecked) => {
						updateFields({
							price: {
								...price,
								exclusive: {
									...price.exclusive,
									checked: newChecked,
								},
							},
						})
					}}
					onChange={(newPrice) => {
						updateFields({
							price: {
								...price,
								exclusive: {
									...price.exclusive,
									price: newPrice,
								},
							},
						})
					}}
				/>
			</div>
			<div className="mt-4 flex flex-col gap-2">
				<p className="m-2 text-text-secondary">Regular</p>
				<PricingSwitch
					defaultChecked={price.basic.checked}
					contractTitle={"Basic License"}
					contractSubtext={"MP3"}
					value={price.basic.price}
					onCheckedChange={(newChecked) => {
						updateFields({
							price: {
								...price,
								basic: {
									...price.basic,
									checked: newChecked,
								},
							},
						})
					}}
					onChange={(newPrice) => {
						updateFields({
							price: {
								...price,
								basic: {
									...price.basic,
									price: newPrice,
								},
							},
						})
					}}
				/>
				<PricingSwitch
					defaultChecked={price.premium.checked}
					contractTitle={"Premium License"}
					contractSubtext={"WAV, MP3"}
					value={price.premium.price}
					onCheckedChange={(newChecked) => {
						updateFields({
							price: {
								...price,
								premium: {
									...price.premium,
									checked: newChecked,
								},
							},
						})
					}}
					onChange={(newPrice) => {
						updateFields({
							price: {
								...price,
								premium: {
									...price.premium,
									price: newPrice,
								},
							},
						})
					}}
				/>
			</div>
			<div className="mt-4 flex flex-col gap-2">
				<p className="m-2 text-text-secondary">Free</p>
				<PricingSwitch
					contractTitle={"Free"}
					free
					contractSubtext={"Tagged MP3"}
					value={price.basic}
					onChange={(newPrice) => {
						updateFields({
							price: { ...price, basic: newPrice },
						})
					}}
				/>
			</div>
		</>
	)
}
