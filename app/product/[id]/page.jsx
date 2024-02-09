import ProductMeta from "@/app/components/Store Components/ProductMeta/ProductMeta"
import styles from "./styles.module.css"
import { getProductById } from "@/libs/supabase/supabaseQuery"

export default async function Page({ params: { id } }) {
	const { product } = await getProductById(id)

	return (
		<main className={styles.main}>
			<ProductMeta product={product} />
			<div className={styles.productSection}></div>
		</main>
	)
}
