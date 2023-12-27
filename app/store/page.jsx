"use client"

import FilterBar from "../components/FilterComponents/FilterBar"
import ProductCard from "../components/ProductCard/ProcudtCard"
import styles from "./styles.module.css"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function Store() {
	// Defines the window range that the filter btn is shown
	const mediaReq = useMediaQuery(`(min-width:1280px)`)

	return (
		<>
			<main className={styles.main}>
				<div className={styles.heroSection}></div>
				<div className={styles.productSection}>
				{!mediaReq ? <FilterBar mediaReq={mediaReq} /> : null}
					<div className={styles.filterGrid}>
						{mediaReq ? <FilterBar mediaReq={mediaReq} /> : null}
					</div>
					<div className={styles.productGrid}>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
				</div>
			</main>
		</>
	)
}
