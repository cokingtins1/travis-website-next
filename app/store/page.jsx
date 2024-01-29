import getProducts from "@/libs/supabase/addProducts"
import FilterBar from "../components/FilterComponents/FilterBar"
import ProductCard from "../components/ProductCard/ProcudtCard"
import styles from "./styles.module.css"
import supabaseClient from "@/libs/supabase/config/supabaseClient"
// import { useSession } from "@/libs/supabase/useSession"

export default async function Store() {
	const { data: products } = await supabaseClient.from("products").select("*")

	return (
		<>
			<main className={styles.main}>
				<section className={styles.heroSection}></section>
				<section className={styles.productSection}>
					<div className="flex items-center">
						<div className="flex items-center h-16 border border-black p-2 ">
							Hello Store
							{/* <FilterBar /> */}
						</div>
					</div>

					<section>
						<ul className={styles.productGrid}>
							{products.map((product, index) => (
								<ProductCard key={index} product={product} />
							))}
						</ul>
					</section>
				</section>
			</main>
		</>
	)
}
