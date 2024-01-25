"use client"

import styles from "./layout.module.css"
import SideBar from "../components/Dashboard Components/SideBar"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import theme from "@/libs/contexts/MuiThemContext"

export default function Layout({ children }) {
	return (
		<MuiThemeProvider theme={theme}>
			<main className={styles.main}>
				<section className={styles.sideBar}>
					<SideBar />
				</section>
				<section className={styles.content}>{children}</section>
			</main>
		</MuiThemeProvider>
	)
}
