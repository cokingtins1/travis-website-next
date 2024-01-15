import Popper from "@mui/material/Popper"
import styles from "./styles.module.css"
import { ClickAwayListener } from "@mui/base"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Button from "@mui/material/Button"

import imageSrc from "@/public/beatKitImage.jpg"

export default function SearchResultList({
	anchorEl,
	filteredItems,
	query,
	setQuery,
}) {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (query.length > 0) {
			setOpen(true)
		} else setOpen(false)
	}, [query])

	return (
		<>
			<ClickAwayListener onClickAway={() => setOpen(false)}>
				<Popper open={open} anchorEl={anchorEl} placement="bottom">
					<div className={styles.searchResultsBox}>
						<div className={styles.searchResults}>
							{filteredItems.length > 0 ? (
								<>
									<p>
										Products{" "}
										<span>{filteredItems.length}</span>
									</p>

									{filteredItems.map((item) => {
										return (
											<ul key={item.id}>
												<Link
													href={"/store"}
													onClick={() => {
														setOpen(false)
														setQuery("")
													}}
													className={styles.itemCard}
													key={item.id}
												>
													<Image
														width={72}
														height={72}
														alt=""
														src={imageSrc}
													/>
													<p>{item.title}</p>
												</Link>
											</ul>
										)
									})}
								</>
							) : (
								<span>no items found</span>
							)}
						</div>
					</div>
				</Popper>
			</ClickAwayListener>
		</>
	)
}

{
	/* <Button
onClick={() => {
    setOpen(false)
    setQuery('')
}}
variant="outlined"
>
<Link href={`/search?query=${query}`}>
    See all results for "{query}"
</Link>
</Button> */
}
