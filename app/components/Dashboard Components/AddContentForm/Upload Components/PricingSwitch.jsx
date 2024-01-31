import MUISwitch from "@mui/material/Switch"
import InputLabel from "@mui/material/InputLabel"

import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
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
		<div className="flex justify-between items-center rounded-lg border border-border-primary p-2">
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
					<p className="text-sm text-text-secondary">
						{contractSubtext}
					</p>
				</div>
			</div>
			{free || (
				<div className="flex items-center gap-2">
					<InputLabel htmlFor="outlined-adornment-password">
						Price:
					</InputLabel>
					<TextField
						size="small"
						type="number"
						id="outlined-start-adornment"
						sx={{ m: 1, width: "100px" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									$
								</InputAdornment>
							),
						}}
						value={value}
						onChange={(e) => {
							setInputValue(e.target.value)
						}}
					/>
				</div>
			)}
		</div>
	)
}
