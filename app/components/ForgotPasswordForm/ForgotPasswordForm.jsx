"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Link from "next/link"
import { useAuth } from "@/libs/contexts/UserContext"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import Alert from "@mui/material/Alert"
import { useState } from "react"

export default function ForgotPasswordForm() {
	const [message, setMessage] = useState("")
	const { resetPassword } = useAuth()
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid Email")
				.required("A valid email is required"),
		}),
		onSubmit: async () => {
			await resetPassword(formik.values.email)
			setMessage("Check your email for further instructions")
		},
	})

	return (
		<>
			{" "}
			{message && <Alert severity="success">{message}</Alert>}
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
				<Button type="submit" variant="outlined">
					Reset Passwrod
				</Button>
			</form>
			<div className="flex gap-4 align-middle">
				<p>Need an account?</p>
				<Link href={"/signup"}>
					<u className="text-blue-700">Sign Up</u>
				</Link>
			</div>
			<div className="flex gap-4 align-middle">
				<Link href={"/login"}>
					<u className="text-blue-700">Login</u>
				</Link>
			</div>
		</>
	)
}