"use client"

import { createTheme } from "@mui/material/styles"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"

const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					// backgroundColor:'#FF0000'
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
