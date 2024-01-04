import getProducts from '@/libs/getProducts'
import FilterBar from "../components/FilterComponents/FilterBar"
import ProductCard from "../components/ProductCard/ProcudtCard"
import styles from "./styles.module.css"


export default async function Page() {
	const { products } = await getProducts()

	return (
		<>
			<main className={styles.main}>
				<section className={styles.heroSection}></section>
				<section className={styles.productSection}>
					<FilterBar />
					<section>
						<ul className={styles.productGrid}>
							<ProductCard products = {products} />
						</ul>
					</section>
				</section>
			</main>
		</>
	)
}
