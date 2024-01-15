import DummyProductCard from "../components/DummyComponents/DummyProductCard"
import Button from '@mui/material/Button';
import styles from "./styles.module.css"

export default function Page() {
	return (
		<main className={styles.main}>
			<section className={styles.sideBar}></section>
			<section className={styles.mainContent}>
				<section className={styles.addContent}>
                    <div>
                        <p>Tracks</p>
                        <Button variant='contained'>+ Add Content</Button>
                    </div>
                    
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
