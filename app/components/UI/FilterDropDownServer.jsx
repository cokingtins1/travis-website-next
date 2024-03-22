import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Link from "next/link"

export default function FilterDropDownServer({ label, items }) {
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
				<Link href={'/'}>
					<TextField
						fullWidth
						size="small"
						id={label}
						type="text"
						InputLabelProps={{
							shrink: true,
						}}
						select
						defaultValue=""
					>
						{/* <div className="h-[200px]"> */}
						{unique.map((item, index) => (
							<MenuItem key={index} value={item}>
								{`${item} (${getOccurrence(items, item)}) `}
							</MenuItem>
						))}
						{/* </div> */}
					</TextField>
				</Link>
			</div>
		</>
	)
}
