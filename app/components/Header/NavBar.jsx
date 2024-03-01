"use client"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ThemeProvider from "@/libs/contexts/ThemeContext"

export default function NavBar() {
	const [tabValue, setTabValue] = useState(0)
	const router = useRouter()

	const indices = [
		{ index: 0, value: "Home", href: "" },
		{ index: 1, value: "Store", href: "store" },
		{ index: 2, value: "Sandbox", href: "sandbox" },
		{ index: 3, value: "Dashboard", href: "dashboard" },
	]

	const primaryAccent = "#1976D2"

	const tabsStyles = {
		color: primaryAccent,

		"& .MuiTabs-indicator": {
			backgroundColor: primaryAccent,
		},
	}

	return (
		<>
			<ThemeProvider>
				<nav className="justify-self-center">
					<Tabs
						sx={tabsStyles}
						onChange={(e) => {
							setTabValue(e.target.value)
						}}
						value={tabValue}
					>
						{indices.map((step) => (
							<Tab
								sx={{
									color: step.index === tabValue && "#1976D2",
								}}
								key={step.index}
								label={step.value}
								onClick={() => {
									setTabValue(step.index)
									router.push(`/${step.href}`)
								}}
							/>
						))}
					</Tabs>
				</nav>
			</ThemeProvider>
		</>
	)
}
