"use client"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormHelperText from "@mui/material/FormHelperText"

import createFormik from "@/libs/supabase/createSupaFormik"
import Link from "next/link"
import { useEffect } from "react"

export default function SignUpForm({ setSignUp, setStatusCode }) {
	const formik = createFormik("signup")

	useEffect(() => {
		setStatusCode(formik.status?.code)
		if (formik.status?.code) {
			console.log("code:", formik.status.code)
		}
		if (formik.status?.code === 202) {
			setSignUp(true)
		}
	}, [formik.status?.code])

	async function handleSubmit(e) {
		e.preventDefault()

		await formik.submitForm()
	}

	return (
		<>
			<form
				action="/auth/sign-up"
				method="post"
				onSubmit={(e) => handleSubmit(e)}
				className="flex flex-col"
			>
				<div className="flex flex-col gap-2">
					<div className="mt-2">
						<TextField
							label="Email"
							type="email"
							name="email"
							fullWidth
							size="small"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={Boolean(
								formik.touched.email && formik.errors.email
							)}
						/>
						{formik.touched.email && formik.errors.email ? (
							<FormHelperText error>
								{formik.errors.email}
							</FormHelperText>
						) : (
							<FormHelperText>&nbsp;</FormHelperText>
						)}
					</div>
					<div>
						<TextField
							label="Password"
							type="password"
							name="password"
							fullWidth
							size="small"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={Boolean(
								formik.touched.password &&
									formik.errors.password
							)}
						/>
						{formik.touched.password && formik.errors.password ? (
							<FormHelperText error>
								{formik.errors.password}
							</FormHelperText>
						) : (
							<FormHelperText>&nbsp;</FormHelperText>
						)}
					</div>
					<div className="mb-2">
						<TextField
							label="Verify Password"
							type="password"
							name="passVerify"
							fullWidth
							size="small"
							value={formik.values.passVerify}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={Boolean(
								formik.touched.passVerify &&
									formik.errors.passVerify
							)}
						/>
						{formik.touched.passVerify &&
						formik.errors.passVerify ? (
							<FormHelperText error>
								{formik.errors.passVerify}
							</FormHelperText>
						) : (
							<FormHelperText>&nbsp;</FormHelperText>
						)}
					</div>

					{formik.status?.code && formik.status?.code !== 202 && (
						<div className="flex gap-2 items-start">
							<FormHelperText error>
								{formik.status?.message}
							</FormHelperText>
							<Link href={"/login"}>
								<Button size="small">Login</Button>
							</Link>
						</div>
					)}

					<Button
						disabled={!formik.dirty || !formik.isValid}
						type="submit"
						variant="outlined"
					>
						Sign Up
					</Button>
				</div>
			</form>
		</>
	)
}
