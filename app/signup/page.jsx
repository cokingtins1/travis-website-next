"use client"

import SupabaseSignUpForm from "../components/SupabaseSignUpForm/SupabaseSignUpForm"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import theme from "@/libs/contexts/MuiThemContext"

export default function SignUp() {
	return (
		<MuiThemeProvider theme={theme}>
			<main className="h-[32rem] flex justify-center items-center">
				<div className="flex flex-col items-center p-8">
					<h1>Sign Up</h1>
					<SupabaseSignUpForm />
				</div>
			</main>
		</MuiThemeProvider>
	)
}
