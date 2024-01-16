import Button from "@mui/material/Button"

import styles from "./page.module.css"
import DummyProductCard from "@/app/components/DummyComponents/DummyProductCard"

export default function Page() {
	return (
		<>
			<section className={styles.addContent}>
				<p>Tracks</p>
				<Button variant="contained">+ Add Content</Button>
			</section>

			<section>
				<ul className={styles.productGrid}>
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
					<DummyProductCard />
				</ul>
			</section>
		</>
	)
}
