import Button from "@mui/material/Button"
import Link from "next/link"

import styles from "./page.module.css"
import DummyProductCard from "@/app/components/DummyComponents/DummyProductCard"

export default function Page() {
	return (
		<>
			<section className={styles.addContent}>
				<p>Tracks</p>
				<Link href={"/dashboard/add-content"}>
					<Button variant="contained">+ Add Content</Button>
				</Link>
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
