"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

export default function Page() {
	const [status, setStatus] = useState(null)
	const [customerEmail, setCustomerEmail] = useState("")
    const router = useRouter()

	useEffect(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const sessionId = urlParams.get("session_id")

		const fetchSessionStatus = async () => {
			const res = await fetch("/api/create-checkout-session", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				body: sessionId,
			})
				.then((res) => res.json())
				.then((data) => {
					setStatus(data.status)
					setCustomerEmail(data.customer_email)
				})
		}
		fetchSessionStatus()
	}, [])

	if (status === "open") {
		router.push('/checkout')
	}

	if (status === "complete") {
		return (
			<section id="success">
				<p>
					We appreciate your business! A confirmation email will be
					sent to {customerEmail}. If you have any questions, please
					email{" "}
					<a href="mailto:orders@example.com">orders@example.com</a>.
				</p>
			</section>
		)
	}

	return null
}
