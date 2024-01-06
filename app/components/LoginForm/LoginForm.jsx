"use client"

import styles from "./styles.module.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useState } from "react"
import Link from "next/link"


export default function LoginForm() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passVerify, setPassVerify] = useState("")

	const [emailError, setEmailError] = useState("")
	const [passwordError, setPasswordError] = useState("")
	const [passVerifyError, setPassVerifyError] = useState("")

	async function handleSubmit(e) {
		e.preventDefault()

		const formData = {
			email: email,
			password: password,
			passVerify: passVerify,
		}

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			setEmailError("Please enter a vailid email")
		} else {
			setEmailError("")
		}

		if (!password || password.length < 6) {
			setPasswordError("Please enter a password more than 6 characters")
		} else {
			setPasswordError("")
		}

		if (!passVerify || password !== passVerify) {
			setPassVerifyError("Passwords do not match")
		} else {
			setPassVerifyError("")
		}

		if (!emailError && !passwordError && !passVerifyError) {
			// check DB if email exists
			console.log("there are no errors")
			try {
				const res = await fetch("/api/validation", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				})

				if (!res.ok) {
					throw new Error("Error validating data")
				}

				console.log(res)
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<>
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={Boolean(emailError)}
					helperText={emailError}
				/>
				<TextField
					fullWidth
					label="password"
					name="passsword"
					type="password"
					minLength={2}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={Boolean(passwordError)}
					helperText={passwordError}
				/>
				<TextField
					fullWidth
					label="verify password"
					name="passVerify"
					type="password"
					value={passVerify}
					onChange={(e) => setPassVerify(e.target.value)}
					error={Boolean(passVerifyError)}
					helperText={passVerifyError}
				/>

				<Button type="submit" variant="outlined">
					Login
				</Button>
			</form>

			<Link href={'/signup'}>
				<Button className="my-4" variant="outlined">
					Sign Up
				</Button>
			</Link>
		</>
	)
}
