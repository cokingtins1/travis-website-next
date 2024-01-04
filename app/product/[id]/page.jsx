import ProductMeta from '@/app/components/ProductMeta/ProductMeta'
import getProductById from "@/libs/getProductById"
import styles from './styles.module.css'


export default async function Page({ params: { id } }) {
	const {product}  = await getProductById(id)

	return (
		<main className={styles.main}>
			<ProductMeta product = {product} />
			<div className={styles.productSection}></div>
		</main>
	)
}
