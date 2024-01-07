"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "./contexts/UserContext"
import { useEffect } from "react"

export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!currentUser) {
			router.push("/")
		}
	}, [currentUser, router])

	return currentUser ? <Component {...rest} /> : null
}
