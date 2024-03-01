"use client"

import { createTheme } from "@mui/material/styles"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"

const theme = createTheme({
	components: {
		MuiList: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
	},
	palette: {
		mode: "dark",
	},
})

export default function ThemeProvider({ children }) {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
