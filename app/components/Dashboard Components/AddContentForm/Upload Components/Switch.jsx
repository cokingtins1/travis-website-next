import MUISwitch from "@mui/material/Switch"
import InputType from "./InputType"
import { useEffect, useState } from "react"

export default function PricingSwitch({
	defaultChecked = false,
	contractTitle,
	contractSubtext,
	value,
	onChange,
	free = false,
	onCheckedChange,
}) {
	const [inputValue, setInputValue] = useState(value || "")
	const [isChecked, setIsChecked] = useState(defaultChecked)

	useEffect(() => {
		onChange && onChange(inputValue)
	}, [inputValue])

	return (
		<div className="flex justify-between items-center rounded-lg border border-slate-400 p-2">
			<div className="flex gap-2">
				<span className="flex items-center p-2">
					<MUISwitch
						checked={isChecked}
						onChange={() => {
							const newChecked = !isChecked
							setIsChecked(newChecked)
							onCheckedChange && onCheckedChange(newChecked)
						}}

					/>
				</span>
				<div>
					<p className="font-semibold">{contractTitle}</p>
					<p className="text-sm text-slate-400">{contractSubtext}</p>
				</div>
			</div>
			{free || (
				<div className="flex items-center gap-2">
					<span className="font-semibold">Price:</span>
					<InputType
						value={value}
						width="small"
						type="number"
						adornment="$"
						textAlign="center"
						onChange={(newValue) => {
							setInputValue(newValue)
						}}
					/>
				</div>
			)}
		</div>
	)
}
