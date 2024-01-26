// // My code:

// // Step 1 - Form
// import styles from "./styles.module.css"
// import TextField from "@mui/material/TextField"
// import Link from "next/link"
// import Button from "@mui/material/Button"
// import createFormik from "@/libs/supabase/createSupaFormik"

// export default function SupabaseLoginForm() {
// 	const formik = createFormik("login")

// 	return (
// 		<>
// 			<form
// 				action="/auth/login"
// 				method="post"
// 				className={styles.loginForm}
// 				onSubmit={(e) => {
// 					e.preventDefault()
// 					formik.submitForm(formik.values)
// 				}}
// 			>
// 				<TextField
// 					fullWidth
// 					id="email"
// 					name="email"
// 					label="email"
// 					value={formik.values.email}
// 					onChange={formik.handleChange}
// 					onBlur={formik.handleBlur}
// 					error={Boolean(formik.touched.email && formik.errors.email)}
// 					helperText={formik.touched.email && formik.errors.email}
// 				/>
// 				<TextField
// 					fullWidth
// 					id="password"
// 					name="password"
// 					label="password"
// 					type="password"
// 					value={formik.values.password}
// 					onChange={formik.handleChange}
// 					onBlur={formik.handleBlur}
// 					error={Boolean(
// 						formik.touched.password && formik.errors.password
// 					)}
// 					helperText={
// 						formik.touched.password && formik.errors.password
// 					}
// 				/>

// 				{formik.status && (
// 					<p className="text-rose-500">{formik.status.message}</p>
// 				)}

// 				<Button type="submit" variant="outlined">
// 					Log In
// 				</Button>
// 			</form>
// 			<div className="flex gap-4 align-middle">
// 				<p>Need an account?</p>
// 				<Link href={"/signup"}>
// 					<u className="text-blue-700">Sign Up</u>
// 				</Link>
// 			</div>
// 			<div className="flex gap-4 align-middle">
// 				<Link href={"/forgot-password"}>
// 					<u className="text-blue-700">Forgot Password?</u>
// 				</Link>
// 			</div>
// 		</>
// 	)
// }

// // Step 2 - using Formik to handle form state and submit the form:

// import { useFormik } from "formik"
// import { useRouter } from "next/navigation"
// import * as Yup from "yup"

// export default function createFormik(formType) {
// 	const router = useRouter()
// 	const form = useFormik({
// 		initialValues: {
// 			email: "",
// 			...(formType === "signup" || formType === "login"
// 				? { password: "" }
// 				: {}),
// 			...(formType === "signup" ? { passVerify: "" } : {}),
// 		},
// 		validationSchema: Yup.object({
// 			email: Yup.string()
// 				.email("Invalid Email")
// 				.required("A valid email is required"),
// 			// Add other validation rules specific to the form type
// 			...(formType === "signup" ||
// 				("login" && {
// 					password: Yup.string().required("A password is required"),
// 				})),
// 			...(formType === "signup" && {
// 				passVerify: Yup.string()
// 					.oneOf([Yup.ref("password"), null], "Passwords must match")
// 					.required("Please validate your password"),
// 			}),
// 		}),

// 		onSubmit: async (values, { resetForm, setSubmitting }) => {
// 			try {
// 				const res = await fetch(`/auth/${formType}`, {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify(values),
// 				})
// 				if (res.ok) {
// 					form.setStatus(null)
// 					setSubmitting(true)
// 					resetForm()
// 					router.push("/")
// 				} else {
// 					form.setStatus({ message: "Invalid email or password" })
// 				}
// 			} catch (error) {
// 				console.error("Error:", error)
// 			} finally {
// 				setSubmitting(false)
// 			}
// 		},
// 	})

// 	return form
// }

// // Step 3 - POST request to update supabase:

// export async function POST(request) {
// 	try {
// 		const requestUrl = new URL(request.url)
// 		const formData = await request.json()
// 		const email = formData.email
// 		const password = formData.password
// 		const cookieStore = cookies()
// 		const supabase = createRouteHandlerClient({
// 			cookies: () => cookieStore,
// 		})



// 		await supabase.auth.signInWithPassword({
// 			email,
// 			password,
// 		})

// 			const user = (await supabase.auth.getUser()).data.user

// 			if (user) {
// 				return NextResponse.redirect(
// 					`${requestUrl.origin}/dashboard`,
// 					{
// 						status: 301,
// 					}
// 				)
// 			} else {
// 				return NextResponse.json(
// 					{ error: "failed to authenticate" },
// 					{ status: 401 }
// 				)
// 			}
// 	} catch (error) {
// 		console.log(error)
// 		return NextResponse.json(
// 			{ error: "An error occurred during authentication" },
// 			{ status: 500 }
// 		)
// 	}
// }

// // Supabase Docs code:

// // Step 1: Form and handle submit

// "use client"

// import { useSupabase } from "@/libs/supabase/supabase-context"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// export default function SupabaseLoginWithClient() {
// 	const { supabase } = useSupabase()
// 	const [email, setEmail] = useState("")
// 	const [password, setPassword] = useState("")
// 	const router = useRouter()

// 	const handleSignUp = async () => {
// 		await supabase.auth.signUp({
// 			email,
// 			password,
// 			options: {
// 				emailRedirectTo: `${location.origin}/auth/callback`,
// 			},
// 		})
// 		router.refresh()
// 	}

// 	const handleSignIn = async () => {
// 		await supabase.auth.signInWithPassword({
// 			email,
// 			password,
// 		})
// 		router.refresh()
// 	}

// 	const handleSignOut = async () => {
// 		await supabase.auth.signOut()
// 		router.refresh()
// 	}

// 	return (
// 		<>
// 			<input
// 				name="email"
// 				onChange={(e) => setEmail(e.target.value)}
// 				value={email}
// 			/>
// 			<input
// 				type="password"
// 				name="password"
// 				onChange={(e) => setPassword(e.target.value)}
// 				value={password}
// 			/>
// 			<button onClick={handleSignUp}>Sign up</button>
// 			<button onClick={handleSignIn}>Sign in</button>
// 			<button onClick={handleSignOut}>Sign out</button>
// 		</>
// 	)
// }

// // Step 2: auth/callback to update supabase:

// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// import { redirect } from "next/dist/server/api-utils"
// import { cookies } from "next/headers"
// import { NextResponse } from "next/server"
// import { revalidatePath } from "next/cache"

// export async function POST(request) {
// 	try {
// 		const requestUrl = new URL(request.url)

// 		const formData = await request.formData()
// 		const email = formData.get("email")
// 		const password = formData.get("password")
// 		const cookieStore = cookies()
// 		const supabase = createRouteHandlerClient({
// 			cookies: () => cookieStore,
// 		})

// 		await supabase.auth.signInWithPassword({
// 			email,
// 			password,
// 		})

// 		return NextResponse.redirect(requestUrl.origin, {
// 			status: 301,
// 		})

// 	} catch (error) {
// 		console.log(error)
// 		return NextResponse.json(
// 			{ error: "An error occurred during authentication" },
// 			{ status: 500 }
// 		)
// 	}
// }

