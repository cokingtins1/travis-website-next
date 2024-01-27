"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Link from "next/link"
import Button from "@mui/material/Button"
import createFormik from "@/libs/supabase/createSupaFormik"
import { redirect } from "next/navigation"

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import theme from "@/libs/contexts/MuiThemContext"

export default function SupabaseLoginForm({ session = null }) {
	const formik = createFormik("login")

	return session ? (
		redirect("/dashboard")
	) : (
		<MuiThemeProvider theme={theme}>
			<>
				<form
					className={styles.loginForm}
					onSubmit={(e) => {
						e.preventDefault()
						formik.submitForm(formik.values)
					}}
				>
					<TextField
						fullWidth
						id="email"
						name="email"
						label="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={Boolean(
							formik.touched.email && formik.errors.email
						)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						fullWidth
						id="password"
						name="password"
						label="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={Boolean(
							formik.touched.password && formik.errors.password
						)}
						helperText={
							formik.touched.password && formik.errors.password
						}
					/>

					{formik.status && (
						<p className="text-rose-500">{formik.status.message}</p>
					)}

					<Button type={"submit"} variant="outlined">
						Log In
					</Button>
				</form>
				<div className="flex gap-4 align-middle">
					<p>Need an account?</p>
					<Link href={"/signup"}>
						<u className="text-blue-700">Sign Up</u>
					</Link>
				</div>
				<div className="flex gap-4 align-middle">
					<Link href={"/forgot-password"}>
						<u className="text-blue-700">Forgot Password?</u>
					</Link>
				</div>
			</>
		</MuiThemeProvider>
	)
}
