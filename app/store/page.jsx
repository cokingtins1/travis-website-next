import ProductCard from "../components/ProductCard/ProcudtCard"
import SearchComponent from "../components/SearchBar/SearchComponent"
import styles from "./styles.module.css"
import { getAllProducts, getUniqueTags } from "@/libs/supabase/supabaseQuery"
import { notFound } from "next/navigation"
import Divider from "@mui/material/Divider"
import { Button } from "../components/UI/Button"

export default async function Store() {
	const products = await getAllProducts()

	const tags = await getUniqueTags()

	if (!products) {
		notFound()
	}

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full ">
				<header className="my-4">
					<SearchComponent />
				</header>
				<div className="flex flex-col justify-center items-center w-full">
					{/* Filter Section */}
					<div className="flex items-center gap-2 my-4">
						{tags.map((tag, index) => {
							return <Button key={index}>{tag}</Button>
						})}
						<Divider />
					</div>
					{/* Filter Section */}

					<section className="w-full">
						<ul className={styles.productGrid}>
							{products.map((product, index) => (
								<ProductCard key={index} product={product} />
							))}
						</ul>
					</section>
				</div>
			</main>
		</>
	)
}
