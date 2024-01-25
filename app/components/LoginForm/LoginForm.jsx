"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Link from "next/link"
import { useAuth } from "@/libs/contexts/UserContext"
import createFormik from "@/libs/firebase/createForm"

export default function LoginForm() {
	const { login } = useAuth()

	const formik = createFormik("login", login)

	return (
		<>
			<form className={styles.loginForm} onSubmit={formik.handleSubmit}>
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
				<Button type="submit" variant="outlined">
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
	)
}
