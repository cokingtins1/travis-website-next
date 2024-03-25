import Switch from "@mui/material/Switch"
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
	onCheckedChange,
	nameSwitch,
	file,
	type,
	namePrice,
	disabled = false,
	width,
	editing = true,
}) {
	const [inputValue, setInputValue] = useState(value || "")
	const [isChecked, setIsChecked] = useState(!!defaultChecked)
	const [touched, setTouched] = useState(false)
	const [error, setError] = useState("")

	useEffect(() => {
		if (!file) {
			setError(`You must upload a ${type} file first`)
		} else {
			setError("")
		}
	}, [file])

	return (
		<div
			className={`flex justify-between items-center rounded-lg border border-border-primary p-2 ${
				width && width
			}`}
		>
			<div className="flex gap-2">
				<span className="flex items-center p-2">
					<Switch
						disabled={disabled}
						name={nameSwitch}
						value={isChecked}
						checked={isChecked}
						onChange={() => {
							if (!file) {
								setTouched(true)
								return
							}
							setError("")
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
				{error && touched && (
					<p className=" text-sm text-text-error mt-auto">{error}</p>
				)}
			</div>

			<div className="flex items-center gap-2">
				<InputLabel htmlFor="outlined-adornment-password">
					Price:
				</InputLabel>
				<TextField
					name={namePrice}
					disabled={!isChecked || !editing}
					size="small"
					type="number"
					id="outlined-start-adornment"
					sx={{ m: 1, width: "100px" }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">$</InputAdornment>
						),
					}}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value)
						onChange && onChange(e.target.value)
					}}
				/>
			</div>
		</div>
	)
}
