import Popper, { PopperPlacementType } from "@mui/material/Popper"
import { useEffect, useState } from "react"

export default function SearchResultList({ filteredItems, query }) {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (query.length > 0) {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}, [query])

	return (
		<div>
			<Popper open={open} anchorEl={"bottom"}>
				<div>Big Ballsack</div>
			</Popper>
		</div>
	)
}
