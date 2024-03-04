"use client"

import TextField from "@mui/material/TextField"
import Link from "next/link"
import Button from "@mui/material/Button"
import createFormik from "@/libs/supabase/createSupaFormik"
import { redirect } from "next/navigation"

export default function SupabaseLoginForm({ session = null }) {
	const formik = createFormik("login")

	// const primaryAccent = "#ffeec2"

	// const buttonStyles = {
	// 	width: "120px",
	// 	height: "36px",
	// 	color: primaryAccent,
	// 	borderColor: primaryAccent,
	// 	"&:hover": {
	// 		borderColor: primaryAccent,
	// 	},
	// }

	return session ? (
		redirect("/dashboard")
	) : (
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

				{formik.status && (
					<p className="text-rose-500">{formik.status.message}</p>
				)}

				<Button type={"submit"} variant="outlined">
					Log In
				</Button>
			</form>
			<div className="flex gap-4 align-middle mt-2">
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
