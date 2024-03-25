"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"
import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { useState } from "react"
import { getURL } from "@/libs/supabase/getUrl"

export default function ForgotPasswordForm() {
	const [success, setSuccess] = useState(false)

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid Email")
				.required("A valid email is required"),
		}),
	})

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			const { data, error } =
				await supabaseClient.auth.resetPasswordForEmail(
					formik.values.email,
					{ redirectTo: `${getURL()}update-password` }
				)

			if (data) {
				setSuccess(true)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{" "}
			<form
				// action="/auth/forgot-password"
				// method="post"
				className={styles.loginForm}
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
				<Button
					type="submit"
					onClick={(e) => handleSubmit(e)}
					disabled={!formik.dirty || !formik.isValid}
					variant="outlined"
				>
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
			{success && (
				<p className="text-green-500">{`A password reset email has been sent to ${formik.values.email}`}</p>
			)}
		</>
	)
}
