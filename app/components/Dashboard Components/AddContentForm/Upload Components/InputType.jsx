
import { useEffect, useState } from "react"

export default function InputType({
	label = "",
	width = "20",
	value,
	onChange,
}) {
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
					className={`rounded border border-slate-300 p-1 flex flex-col flex-wrap gap-2 ${
						isfocused && "border-blue-500"
					}`}
					onFocus={() => setIsfocused(true)}
					onBlur={() => setIsfocused(false)}
				>
					<div className="flex items-center">
						<input
							className={`w-${width} bg-none p-1 focus:outline-none`}
							type="text"
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
