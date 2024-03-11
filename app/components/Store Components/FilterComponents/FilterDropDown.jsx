"use client"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function FilterDropDown({
	items,
	paramName,
	selected,
	filteredProducts,
}) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [value, setValue] = useState(selected || "")

	function getOccurrence(value) {
		return filteredProducts.filter((product) =>
			product[paramName].includes(value)
		).length
	}

	const updateQueryParam = (paramName, value) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()))

		if (!value) {
			current.delete(paramName)
		} else {
			current.set(paramName, value)
		}

		const search = current.toString()
		const query = search ? `?${search}` : ""

		router.push(`${pathname}${query}`)
	}

	const onSelect = (e) => {
		const value = e.target.value.trim()
		updateQueryParam(paramName, value)
	}

	return (
		<>
			<div className="flex flex-col gap-1">
				<label className="w-[160px] font-bold text-sm text-text-secondary">
					{paramName.toUpperCase()}
				</label>
				<TextField
					key={selected}
					fullWidth
					size="small"
					id={paramName}
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					select
					value={value || ""}
					onChange={(e) => {
						const newValue = e.target.value
						setValue(newValue)
						onSelect(e)
					}}
				>
					{items.map((item) => (
						<MenuItem key={item} value={item}>
							{`${item} (${getOccurrence(item)}) `}
						</MenuItem>
					))}
				</TextField>
			</div>
		</>
	)
}
