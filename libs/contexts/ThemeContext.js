"use client"

import { createContext, useContext } from "react"


export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("dark")

	function toggleTheme() {
		setTheme((curr) => (curr === "light" ? "dark" : "light"))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

