import React from "react"
import styles from "./layout.module.css"
import SideBar from "../components/Dashboard Components/SideBar"

export default function Layout({ children }) {
	return (
		<main className={styles.main}>
			<section className={styles.sideBar}>
				<SideBar />
			</section>
			<section className={styles.content}>{children}</section>
		</main>
	)
}
