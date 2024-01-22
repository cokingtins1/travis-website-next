import { createTheme } from "@mui/material/styles"

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

export default theme
