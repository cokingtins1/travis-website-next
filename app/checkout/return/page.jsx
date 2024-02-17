"use client"

import { useShoppingCart } from "@/libs/contexts/CartContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page({ searchParams }) {
	const [status, setStatus] = useState(null)
	const [customerEmail, setCustomerEmail] = useState("")
	const router = useRouter()
	const { clearShoppingCart } = useShoppingCart()

	useEffect(() => {
		const sessionId = searchParams.session_id

		const fetchSessionStatus = async () => {
			const res = await fetch(
				`/api/create-checkout-session?session_id=${sessionId}`,
				{
					method: "GET",
				}
			)

			if (res.ok) {
				const data = await res.json()
				setStatus(data.status)
				setCustomerEmail(data.customer_email)
			}
		}
		fetchSessionStatus()
	}, [])

	if (status === "open") {
		router.push("/checkout")
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
