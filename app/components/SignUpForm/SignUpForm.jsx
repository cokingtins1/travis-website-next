"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Link from "next/link"
import Button from "@mui/material/Button"
import { useAuth } from "@/libs/contexts/UserContext"
import createFormik from "@/libs/FormSubmit"

export default function SignUpForm() {
	const { signup } = useAuth()

	const formik = createFormik("signup", signup)

	return (
		<>
			{/* {currentUser.email} */}
			<form className={styles.loginForm} onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="email"
					name="email"
					label="email"
					value={formik.values.email}
					// value={signupFormik.values.email}
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

				<Button type="submit" variant="outlined">
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
