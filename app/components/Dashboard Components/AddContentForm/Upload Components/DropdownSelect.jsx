import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined"

import { useEffect, useRef, useState } from "react"

export default function DropDownSelect({
	label = "",
	dropDownList = false, // dropDownList is an object
	width = "fit",
	value,
	onChange,
}) {
	const sizeVariants = {
		min: "w-min",
		max: "w-max",
		fit: "w-fit",
		small: "w-20",
		medium: "w-40",
		large: "w-80",
	}

	const [dropDownValue, setDropDownValue] = useState(value || "")
	const [isfocused, setIsfocused] = useState(false)
	const [popperOpen, setPopperOpen] = useState(false)
	const [isKeyDownIcon, setIsKeyDownIcon] = useState(true)
	const inputRef = useRef(null)
	const popperRef = useRef(null)

	useEffect(() => {
		onChange && onChange(dropDownValue)
	}, [dropDownValue, onChange])

	// Click away listenter for dropdown
	useEffect(() => {
		const handler = (e) => {
			if (!popperRef.current.contains(e.target)) {
				setPopperOpen(false)
			}
		}
		document.addEventListener("mousedown", handler)

		return () => {
			document.removeEventListener("mousedown", handler)
		}
	})

	function Popper() {
		return (
			<div className="absolute top-full left-0 z-10 h-48 w-11/12 bg-bg-secondary rounded border border-slate-300 overflow-hidden overflow-y-auto px-1 py-2">
				<ul>
					{dropDownList.map((item, index) => (
						<li
							className="cursor-pointer hover:bg-slate-300 hover:text-black  rounded p-1"
							value={item}
							onClick={() => {
								// inputRef.current.focus()
								setDropDownValue(item)
								setPopperOpen(false)
							}}
							key={index}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		)
	}

	return (
		<>
			<div
				className="relative flex flex-col justify-center items-left my-2"
				ref={popperRef}
			>
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
							className={`${sizeVariants[width]} bg-inherit p-1 focus:outline-none disabled:bg-inherit`}
							type="text"
							disabled
							ref={inputRef}
							value={dropDownValue}
							onChange={(e) => {
								setDropDownValue(e.target.value)
							}}
						/>

						<button
							className="text-slate-400"
							onClick={(e) => {
								e.preventDefault()
								setIsKeyDownIcon(!isKeyDownIcon)
								setPopperOpen(!popperOpen)
							}}
						>
							{isKeyDownIcon ? (
								<KeyboardArrowDownOutlinedIcon />
							) : (
								<KeyboardArrowUpOutlinedIcon />
							)}
						</button>
					</div>
				</div>
				{dropDownList && popperOpen ? Popper() : null}
			</div>
		</>
	)
}
