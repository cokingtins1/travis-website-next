"use client"

import SupabaseLoginForm from "../components/SupabaseLoginForm/SupabaseLoginForm"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import theme from "@/libs/contexts/MuiThemContext"

export default function Page() {
	return (
		<MuiThemeProvider theme={theme}>
			<main className="h-[32rem] flex justify-center items-center">
				<div className=" flex flex-col items-center p-8">
					<h1>Log in</h1>
					<SupabaseLoginForm />
				</div>
			</main>
		</MuiThemeProvider>
	)
}
