"use client"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import ThemeProvider from "@/libs/contexts/ThemeContext"
import useWindowSize from "../CustomHooks/useWindowSize"

export default function NavBar({ session = true }) {
	const path = usePathname()
	const page = path.replace(/^[^/]*\/([^/]*)\/?.*$/, "$1")

	const router = useRouter()

	const size = useWindowSize()

	const indices = [
		{ index: 0, value: "Home", href: "" },
		{ index: 1, value: "Store", href: "store" },
	]

	if (session) {
		indices.push({
			index: indices.length,
			value: "Dashboard",
			href: "dashboard",
		})
	}

	const [tabValue, setTabValue] = useState(() => {
		const foundIndex = indices.find((index) => index.href === page)
		return foundIndex ? foundIndex.index : 0
	})
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
				<div>
					<Tabs
						sx={tabsStyles}
						onChange={(e) => {
							setTabValue(e.target.value)
						}}
						value={tabValue}
						orientation={
							size.width < 768 ? "vertical" : "horizontal"
						}
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
				</div>
			</ThemeProvider>
		</>
	)
}
