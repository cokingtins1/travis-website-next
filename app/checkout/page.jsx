"use client"

import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement } from "@stripe/react-stripe-js"
import { useShoppingCart } from "@/libs/contexts/CartContext"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Page() {
	const { shoppingCart } = useShoppingCart()
	const [clientSecret, setClientSecret] = useState("")

	useEffect(() => {
		// Create a Checkout Session as soon as the page loads

		const fetchData = async () => {
			const res = await fetch("/api/create-checkout-session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(shoppingCart),
			})

			if (res.ok) {
				const data = await res.json()
				setClientSecret(data)
			}
		}
		fetchData()
	}, [])

	const options = {
		clientSecret: clientSecret,
	}

	const mediaMain = {
		lg: "lg:grid-cols-12",
	}

	const mediaCart = {
		lg: "lg:col-span-7 px-2",
	}

	const mediaSummary = {
		lg: "lg:col-span-5 px-2",
	}

	return (
		<main className={`grid grid-cols-8 px-4 pt-4 gap-4 ${mediaMain.lg} `}>
			<div id="checkout">
				{/* <Elements stripe={stripePromise} options={options}>
					<form action="">
						<PaymentElement />
					</form>
				</Elements> */}
			</div>

			{/* <section
				className={`grid content-start col-span-8 px-10 ${mediaCart.lg} `}
			>
				{" "}
				cart section
			</section>
			<section
				className={`grid content-start col-span-8 px-10 gap-4 ${mediaSummary.lg} `}
			>
				cart summary
			</section> */}
		</main>
	)
}
