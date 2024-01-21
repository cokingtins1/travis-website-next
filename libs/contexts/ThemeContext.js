"use client"

import { createContext, useContext, useState } from "react"


const ThemeContext = createContext()

export function useTheme(){
	return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(null)

	const btnColor = ''

	function toggleTheme() {
		setTheme((curr) => (curr === "light" ? "dark" : "light"))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

