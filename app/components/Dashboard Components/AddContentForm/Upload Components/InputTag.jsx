import { useState } from "react"

export default function InputTag() {
	const [tagList, setTagList] = useState([])
	const [newTag, setNewTag] = useState("")
	const [isfocused, setIsfocused] = useState(false)

	function addTag() {
		setTagList((currentTags) => {
			return [...currentTags, { name: newTag, id: crypto.randomUUID() }]
		})
		setNewTag("")
	}

	function deleteTag(tagId) {
		setTagList((currentTags) => {
			return currentTags.filter((tag) => tag.id !== tagId)
		})
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

	return (
		<>
			<div
				className={`rounded border border-slate-300 p-2 flex flex-wrap gap-2 ${
					isfocused && "border-blue-500"
				}`}
				onFocus={() => setIsfocused(true)}
				onBlur={() => setIsfocused(false)}
			>
				{tagList.length > 0 && renderTags()}
				<input
					className="bg-none grow p-1 focus:outline-none"
					type="text"
					value={newTag}
					onChange={(e) => setNewTag(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault()
							addTag()
						}
					}}
				/>
				<button>+Add</button>
			</div>
		</>
	)
}
