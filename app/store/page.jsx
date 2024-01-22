import getProducts from "@/libs/getProducts"
import FilterBar from "../components/FilterComponents/FilterBar"
import ProductCard from "../components/ProductCard/ProcudtCard"
import styles from "./styles.module.css"

export default async function Store() {
	const { products } = await getProducts()

	return (
		<>
			<main className={styles.main}>
				<section className={styles.heroSection}></section>
				<section className={styles.productSection}>
					<div className="flex items-center">
						<div className="flex items-center h-16 border border-black p-2 ">
							{/* <FilterBar /> */}
						</div>
					</div>

					<section>
						<ul className={styles.productGrid}>
							<ProductCard products={products} />
						</ul>
					</section>
				</section>
			</main>
		</>
	)
}
