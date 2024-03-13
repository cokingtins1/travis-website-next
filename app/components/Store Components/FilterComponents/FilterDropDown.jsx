"use client"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"

import { useState } from "react"

import { useSearch } from "@/libs/contexts/SearchContext"

export default function FilterDropDown({
	items,
	paramName,
	selected,
	filteredProducts,
}) {
	const [value, setValue] = useState(selected || "")

	const { updateQueryParam } = useSearch()

	function getOccurrence(value) {
		return filteredProducts.filter((product) =>
			product.product_data[paramName].includes(value)
		).length
	}

	const onSelect = (e) => {
		const value = e.target.value.trim()
		updateQueryParam(paramName, value)
	}

	return (
		<>
			<div className="flex flex-col gap-1">
				<label className="font-bold text-sm text-text-secondary">
					{paramName.toUpperCase()}
				</label>
				<TextField
					key={selected}
					fullWidth
					size="small"
					sx={{ width: "130px", height: "30px" }}
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
						<MenuItem
							sx={{ fontSize: "0.75rem" }}
							key={crypto.randomUUID()}
							value={item}
						>
							{getOccurrence(item) >= 1 &&
								`${item} (${getOccurrence(item)}) `}
						</MenuItem>
					))}
				</TextField>
			</div>
		</>
	)
}
