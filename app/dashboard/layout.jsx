"use client"

import React from "react"
import styles from "./layout.module.css"
import SideBar from "../components/Dashboard Components/SideBar"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function Layout({ children }) {
	return (
		<main className={styles.main}>
			<section className={styles.sideBar}>
				<SideBar />
			</section>
			<section className={styles.content}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					{children}
				</LocalizationProvider>
			</section>
		</main>
	)
}
