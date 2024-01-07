"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/libs/contexts/UserContext"
import { useRouter } from 'next/navigation'

export default function LoginForm() {
	const { login } = useAuth()
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			passVerify: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid Email")
				.required("A valid email is required"),
			password: Yup.string().required("A password is required"),
		}),
		onSubmit: async (values) => {
			try {
				await login(values.email, values.password)
				router.push('/dashboard')
			} catch (error) {
				console.log('Failed to Login')
			}

			// createUser(values)
			// alert(JSON.stringify(values, null, 2))
		},
	})
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
					{" "}
					<u className="text-blue-700">Sign Up</u>
				</Link>
			</div>
		</>
	)
}
