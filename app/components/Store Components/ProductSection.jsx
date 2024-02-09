import NewProductCard from "../ProductCard/NewProductCard"
import { Button } from "../UI/Button"
import FilterSection from "./FilterComponents/FilterSection"
import Divider from "@mui/material/Divider"
import { Suspense } from "react"
import Skeleton from "@mui/material/Skeleton"

export default function ProductSection({
	productData,
	tags,
	genres,
	moods,
	instruments,
}) {
	// const { tags, genres, moods, instruments } = filters

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full ">
				<div className="flex flex-col items-center gap-2 my-4">
					{/* <div className="flex gap-4">
						{tags?.map((tag, index) => {
							return <Button key={index}>{tag}</Button>
						})}
						<Divider />
					</div> */}
					<div className="flex">
						<FilterSection
							genres={genres}
							moods={moods}
							instruments={instruments}
						/>
					</div>
				</div>
				<section className="w-full">
					<ul className="grid sm:grid-cols-2 gap-x-4 grid-cols-1 ">
						{productData?.map((product, index) => (
							<NewProductCard key={index} product={product} />
						))}
					</ul>
				</section>
			</div>
		</>
	)
}
