import { useEffect, useState } from "react"

export default function InputType({
	label,
	width = "fit",
	value,
	onChange,
	type = "text",
	adornment,
	textAlign = "start",
}) {
	const variants = {
		width: {
			min: "w-min",
			max: "w-max",
			fit: "w-fit",
			small: "w-20",
			medium: "w-40",
			large: "w-80",
		},

		textAlign: {
			left: "text-start",
			center: "text-center",
			right: "text-end",
			justify: "text-justify",
		},
	}

	const [isfocused, setIsfocused] = useState(false)
	const [inputValue, setInputValue] = useState(value || "")

	useEffect(() => {
		onChange && onChange(inputValue)
	}, [inputValue])

	return (
		<>
			<div className="relative flex flex-col justify-center items-left my-2">
				{label && <p className="font-semibold">{label}</p>}
				<div
					className={`rounded border border-border-primary p-1 flex flex-col flex-wrap gap-2 ${
						isfocused && "border-blue-500"
					}`}
					onFocus={() => setIsfocused(true)}
					onBlur={() => setIsfocused(false)}
				>
					<div className="flex items-center gap-1">
						{adornment && (
							<p className="text-text-secondary">{adornment}</p>
						)}
						<input
							className={`${variants.width[width]} ${variants.textAlign[textAlign]} bg-inherit focus:outline-none`}
							type={type}
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value)
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
