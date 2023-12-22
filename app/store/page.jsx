"use client"

import FilterComponent from "../components/FilterComponents/FilterComponent"
import FilterDrawer from "../components/FilterComponents/FilterDrawer"
import ProductCard from "../components/ProductCard/ProcudtCard"
import styles from "./styles.module.css"
import { useState } from "react"

export default function Store() {
	const [state, setState] = useState(false)

	function toggleDrawer(anchor, open) {
		return function (event) {
			if (
				event.type === "keydown" &&
				(event.key === "Tab" || event.key === "Shift")
			) {
				return
			}

			setState({ ...state, [anchor]: open })
		}
	}

	return (
		<>
			<main className={styles.main}>
				<div className={styles.heroSection}></div>
				{/* <div className={styles.filterButton}>
					<FilterDrawer />
				</div> */}
				<div className={styles.productSection}>
					{/* <div className={styles.filterGrid}>
						<FilterDrawer />
					</div> */}
					<FilterDrawer />
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
