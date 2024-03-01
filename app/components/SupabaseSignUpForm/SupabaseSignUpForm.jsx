"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Link from "next/link"
import Button from "@mui/material/Button"
import createFormik from "@/libs/supabase/createSupaFormik"

export default function SupabaseSignUpForm() {
	const formik = createFormik("signup")

	const primaryAccent = "#ffeec2"

	const buttonStyles = {
		width: "120px",
		height: "36px",
		color: primaryAccent,
		borderColor: primaryAccent,
		"&:hover": {
			borderColor: primaryAccent,
		},
	}

	return (
		<>
			<form
				action="/auth/sign-up"
				method="post"
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
					error={Boolean(formik.touched.email && formik.errors.email)}
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
				<TextField
					fullWidth
					id="passVerify"
					name="passVerify"
					label="verify password"
					type="password"
					value={formik.values.passVerify}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={Boolean(
						formik.touched.passVerify && formik.errors.passVerify
					)}
					helperText={
						formik.touched.passVerify && formik.errors.passVerify
					}
				/>

				<Button
					sx={buttonStyles}
					disabled={
						!formik.values.email ||
						!formik.values.password ||
						!formik.values.passVerify
					}
					type="submit"
					variant="outlined"
				>
					Sign Up
				</Button>
			</form>

			<div className="flex gap-4 align-middle">
				<p>Already have an account</p>
				<Link href={"/login"}>
					{" "}
					<u className="text-blue-700">Login</u>
				</Link>
			</div>
		</>
	)
}
