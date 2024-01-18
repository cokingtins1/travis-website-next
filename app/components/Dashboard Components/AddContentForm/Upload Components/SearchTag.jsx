import { useRef, useState } from "react"
import DropDown from "./DropDown.json"

export default function SearchTag() {
	const [tagList, setTagList] = useState([])
	const [newTag, setNewTag] = useState("")
	const [isfocused, setIsfocused] = useState(false)
	const [popperOpen, setPopperOpen] = useState(false)
	const [limit, setLimit] = useState(false)
	const inputRef = useRef(null)

	function addTag(tag) {
		if (!tagList.length > 5) {
			if (tagList.some((t) => t.name === tag)) return

			setTagList((currentTags) => {
				return [...currentTags, { name: tag, id: crypto.randomUUID() }]
			})
			setNewTag("")
		} else{
			console.log(limit)
			setLimit(true)
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
			addTag(newTag)
		}
		if (e.key === "Backspace" && !inputString) {
			e.preventDefault()
			deleteLastTag()
		}

		return
	}

	function renderTags() {
		return tagList.map((tag) => (
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
		))
	}

	// Popper({dropDownList? <- optional, anchor?, addFunctionality?, limit?})

	function Popper() {
		return (
			<div className="h-48 w-11/12 rounded border border-slate-300 overflow-hidden overflow-y-auto p-1">
				<ul>
					{DropDown.Genre.map((item, index) => (
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
			<div className="flex flex-col justify-center items-center">
				<div
					className={`rounded border border-slate-300 p-2 flex flex-wrap gap-2 ${
						isfocused && "border-blue-500"
					}`}
					onFocus={() => setIsfocused(true)}
					onBlur={() => setIsfocused(false)}
					>
					{limit && 'you have reached the limit'}
					{tagList.length > 0 && renderTags()}
					<input
						className="bg-none grow p-1 focus:outline-none"
						type="text"
						ref={inputRef}
						value={newTag}
						onChange={(e) => setNewTag(e.target.value)}
						onKeyDown={(e) => {
							handleKeyDown(e, newTag)
						}}
					/>
					<button
						className="text-slate-400"
						onClick={() => {
							setPopperOpen(!popperOpen)
						}}
					>
						+Add
					</button>
				</div>
				{popperOpen ? Popper() : null}
			</div>
		</>
	)
}
