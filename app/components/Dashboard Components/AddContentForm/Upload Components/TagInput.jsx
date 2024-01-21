import { useEffect, useRef, useState } from "react"

export default function TagInput({
	label = "",
	dropDownList = false, // dropDownList is an object
	addFunctionality = false,
	limit = null,
	value,
	onChange,
	type,
}) {
	const [tagList, setTagList] = useState(value || [])
	const [newTag, setNewTag] = useState("")
	const [isfocused, setIsfocused] = useState(false)
	const [popperOpen, setPopperOpen] = useState(false)
	const [limitReached, setLimitReached] = useState(false)
	const inputRef = useRef(null)
	const popperRef = useRef(null)

	function addTag(tag) {
		if (checkLimit()) return

		if (tagList.some((t) => t.name === tag)) return

		setTagList((currentTags) => {
			return [...currentTags, { name: tag, id: crypto.randomUUID() }]
		})

		setNewTag("")
	}

	// Updates state of limitReached immediately so alert can render real-time
	useEffect(() => {
		checkLimit()
		onChange && onChange(tagList)
	}, [tagList])

	function checkLimit() {
		if (tagList.length === limit) {
			setLimitReached(true)
			return true
		} else {
			setLimitReached(false)
			return false
		}
	}

	function deleteTag(tagId) {
		setTagList((currentTags) => {
			return currentTags.filter((tag) => tag.id !== tagId)
		})
	}

	function deleteLastTag() {
		setTagList((currentTags) => {
			return currentTags.slice(0, -1)
		})
	}

	function handleKeyDown(e, inputString) {
		if (e.key === "Enter" && inputString) {
			e.preventDefault()
			if (inputString.trim().replace(/\s/g, "").length >= 1) {
				addTag(inputString)
			} else {
				return
			}
		}
		if (e.key === "Backspace" && !inputString) {
			e.preventDefault()
			deleteLastTag(inputString)
		}

		return
	}

	function renderTags() {
		return (
			<div className="flex gap-2">
				{tagList.map((tag) => (
					<div
						key={tag.id}
						className=" flex items-center gap-2 rounded bg-blue-100 text-blue-500 px-1"
					>
						<p>{tag.name}</p>
						<button
							onClick={() => deleteTag(tag.id)}
							className="text-slate-400"
						>
							x
						</button>
					</div>
				))}
			</div>
		)
	}

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
			<div className="absolute top-full left-0 z-10 h-48 w-11/12 bg-white rounded border border-slate-300 overflow-hidden overflow-y-auto px-1 py-2">
				<ul>
					{dropDownList.map((item, index) => (
						<li
							className="cursor-pointer hover:bg-slate-300 rounded p-1"
							value={item}
							onClick={() => {
								addTag(item)
								inputRef.current.focus()
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
					{limitReached && (
						<span className="text-slate-400">
							Limit {limit} inputs
						</span>
					)}
					<div className="flex items-center">
						{tagList.length > 0 && renderTags()}
						<input
							className="bg-inherit grow p-1 focus:outline-none disabled:bg-inherit"
							type={type}
							ref={inputRef}
							disabled={dropDownList ? true : false}
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
							onKeyDown={(e) => {
								handleKeyDown(e, newTag)
							}}
						/>
						{addFunctionality && (
							<button
								className="text-slate-400"
								onClick={(e) => {
									e.preventDefault()
									setPopperOpen(!popperOpen)
								}}
							>
								+Add
							</button>
						)}
					</div>
				</div>
				{dropDownList && popperOpen ? Popper() : null}
			</div>
		</>
	)
}
