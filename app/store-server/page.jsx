import SearchComponent from "../components/SearchBar/SearchComponent"
import {
	getAllColVals,
	getAllProducts,
	getUniqueTags,
} from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import Divider from "@mui/material/Divider"
import { Button } from "../components/UI/Button"
import NewProductCard from "../components/ProductCard/NewProductCard"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Link from "next/link"

export default async function Store({ searchParams }) {
	const products = await getAllProducts()
	const tags = await getUniqueTags()
	const genres = await getAllColVals("genres")
	const moods = await getAllColVals("moods")
	const instruments = await getAllColVals("instruments")

	if (!products) {
		notFound()
	}

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full">
				<header className="my-4">
					<SearchComponent />
				</header>
				<div className="flex flex-col justify-center items-center w-full ">
					{/* Filter Section */}
					<div className="flex flex-col items-center gap-2 my-4">
						<div className="flex gap-4">
							{tags.map((tag, index) => {
								return <Button key={index}>{tag}</Button>
							})}
							<Divider />
						</div>
						<div className="w-full flex justify-start items-center gap-4 bg-bg-elevated p-4">
							<div className="flex flex-col gap-1">
								<label className="w-[160px] font-bold text-sm text-text-secondary">
									{label}
								</label>
								<Link href={"/"}>
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
												{`${item} (${getOccurrence(
													items,
													item
												)}) `}
											</MenuItem>
										))}
										{/* </div> */}
									</TextField>
								</Link>
							</div>
						</div>
					</div>
					{/* Filter Section */}

					{/* PRODUCT SECTION */}
					<section className="w-full">
						<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
							{products.map((product, index) => (
								<NewProductCard key={index} product={product} />
							))}
						</ul>
					</section>
				</div>
			</main>
		</>
	)
}
