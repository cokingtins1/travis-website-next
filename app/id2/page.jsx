import AudioVisualizer from '../components/AudioVisualizer/AudioVisualizer'
import ProductMeta from "../components/ProductMeta/ProductMeta"

import styles from './styles.module.css'

export default function Page() {
	return (
		<main className={styles.main}>
			<ProductMeta />

			<div className={styles.productSection}>
			<AudioVisualizer/>
				
			</div>
		</main>
	)
}
