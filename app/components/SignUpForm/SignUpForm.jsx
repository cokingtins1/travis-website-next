"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Link from "next/link"
import Button from "@mui/material/Button"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/libs/contexts/UserContext"
import { useRouter } from 'next/navigation'


export default function SignUpForm() {
	const { signup } = useAuth()
	const router = useRouter()

	// async function createUser(formData) {
	// 	console.log("there are no errors")
	// 	try {
	// 		const res = await fetch("/api/validation", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(formData),
	// 		})

	// 		if (!res.ok) {
	// 			throw new Error("Error validating data")
	// 		}

	// 		console.log(res)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

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
			passVerify: Yup.string()
				.oneOf([Yup.ref("password"), null], "Passwords must match")
				.required("please validate your password"),
		}),
		onSubmit: async (values) => {
			try {
				await signup(values.email, values.password)
				router.push('/dashboard')
			} catch (error) {
				console.log(error)
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
