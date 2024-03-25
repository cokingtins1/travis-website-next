"use client"

import TextField from "@mui/material/TextField"
import Link from "next/link"
import Button from "@mui/material/Button"
import { useFormik } from "formik"
import * as Yup from "yup"
import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ResetPasswordForm() {
	const [success, setSuccess] = useState(false)
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			password: "",
			passVerify: "",
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.required("A password is required")
				.min(6, "Password must be at least 6 characters"),
			passVerify: Yup.string()
				.oneOf([Yup.ref("password"), null], "Passwords must match")
				.required("Please validate your password")
				.min(6, "Password must be at least 6 characters"),
		}),
	})

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			const { data: resetData, error } =
				await supabaseClient.auth.updateUser({
					password: formik.values.password,
				})

			if (resetData) {
				setSuccess(true)
				router.push("/login")
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<form
				className="min-w-[324px] flex items-center flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault()
					formik.submitForm(formik.values)
				}}
			>
				<TextField
					fullWidth
					id="password"
					name="password"
					label="Password"
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
					label="Verify Password"
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
					disabled={!formik.dirty || !formik.isValid}
					type="submit"
					variant="outlined"
					onClick={(e) => handleSubmit(e)}
				>
					Reset Password
				</Button>
			</form>

			<div className="flex gap-4 align-middle">
				<p>Already have an account</p>
				<Link href={"/login"}>
					{" "}
					<u className="text-blue-700">Login</u>
				</Link>
			</div>
			{success && (
				<p className="text-green-500">Password successfully reset</p>
			)}
		</>
	)
}
