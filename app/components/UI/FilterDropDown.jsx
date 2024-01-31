"use client"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function FilterDropDown({ label, items, type }) {
	const [value, setValue] = useState("")
	const [query, setQuery] = useState("")
	const router = useRouter()

	const searchParams = useSearchParams()

	const [genreQuery, setGenreQuery] = useState(
		searchParams.get("genres") || ""
	)
	const [moodQuery, setMoodQuery] = useState(searchParams.get("moods") || "")
	const [instrumentQuery, setInstrumentQuery] = useState(
		searchParams.get("instruments") || ""
	)

	// const [genreQuery, setGenreQuery] = useState("")
	// const [moodQuery, setMoodQuery] = useState("")
	// const [instrumentQuery, setInstrumentQuery] = useState("")


	// console.log("allQueries:", allQueries)

	function updateQuery(newQuery) {
		if (type === "genres") {
			setGenreQuery(newQuery)
		} else if (type === "moods") {
			setMoodQuery(newQuery)
		} else if (type === "instruments") {
			setInstrumentQuery(newQuery)
		}
	}

	console.log(genreQuery)

	useEffect(() => {
		// window.history.pushState(
		// 	null,
		// 	"",
		// 	`?genres=${genreQuery}&moods=${moodQuery}&instruments=${instrumentQuery}`
		// )
		router.push(`?genres=${genreQuery}&moods=${moodQuery}&instruments=${instrumentQuery}`, {scroll: false})
	}, [genreQuery, moodQuery, instrumentQuery])

	// console.log(query)

	// const genreSearch = searchParams.get("moods")
	// console.log("genreSearch params:", genreSearch)

	// items will be array of all values in column

	// get unique list of items
	const unique = items
		.filter((value, index, array) => array.indexOf(value) === index)
		.sort()

	function getOccurrence(array, value) {
		return array.filter((v) => v === value).length
	}

	return (
		<>
			<div className="flex flex-col gap-1">
				<label className="w-[160px] font-bold text-sm text-text-secondary">
					{label}
				</label>
				<TextField
					fullWidth
					size="small"
					id={label}
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					select
					value={value}
					onChange={(e) => {
						const newValue = e.target.value
						// updateQuery(newValue)
						setValue(newValue)
						// updateFilters(e.target.value)
					}}
				>
					{/* <div className="h-[200px]"> */}
					{unique.map((item, index) => (
						<MenuItem
							key={index}
							value={item}
							onClick={() => updateQuery(item)}
						>
							<Link
								href={{
									pathname: "store",
									query: { [label.toLowerCase()]: item },
								}}
							>
								{`${item} (${getOccurrence(items, item)}) `}
							</Link>
						</MenuItem>
					))}
					{/* </div> */}
				</TextField>
			</div>
		</>
	)
}
