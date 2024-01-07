"use client"

import Button from "@mui/material/Button"
import Link from "next/link"
import Card from "@mui/material/Card"
import Alert from "@mui/material/Alert"
import CardContent from "@mui/material/CardContent"
import { useState } from "react"
import { useAuth } from "@/libs/contexts/UserContext"
import { useRouter } from "next/navigation"
import PrivateRoute from "@/libs/PrivateRoute"

export function Profile() {
	const [error, setError] = useState("")
	const { currentUser, logout } = useAuth()
	const router = useRouter()

	async function handleLogout() {
		setError("")

		try {
			await logout()
			router.push("/login")
		} catch (error) {
			setError("Failed to log out")
		}
	}

	return (
		<>
			<Card>
				<CardContent className="flex flex-col justify-center items-center">
					<h1 className="mb-4">Profile</h1>
					{error && <Alert variant="danger">{error}</Alert>}
					<p>
						<strong>Email: </strong>
						{currentUser.email}
					</p>

					<Button variant="outlined">
						<Link href={"update-profile"}>Update Profile</Link>
					</Button>
				</CardContent>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="contained" onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	)
}

export default function PrivateProfile () {
    return <PrivateRoute component={Profile} />
}
