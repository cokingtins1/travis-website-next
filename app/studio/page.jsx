// My files

import styles from "./styles.module.css"
import DummyProductCard from "../components/DummyComponents/DummyProductCard"
import SideBar from "../components/Dashboard Components/SideBar"

// MUI
import Button from "@mui/material/Button"

export default function Page() {
	return (
		<main className={styles.main}>
			<section className={styles.sideBar}>
				<SideBar />
			</section>
			<section className={styles.mainContent}>
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
			</section>
		</main>
	)
}
