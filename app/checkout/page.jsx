"use client"

import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"
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
				setClientSecret(data.clientSecret)
			}
		}
		fetchData()
	}, [])

	const mediaMain = {
		lg: "lg:grid-cols-12",
	}

	const mediaCart = {
		lg: "lg:col-span-7 px-2",
	}

	const mediaSummary = {
		lg: "lg:col-span-12 px-2",
	}

	const options = {
		clientSecret: `{{${clientSecret}}}`,
	}

	return (
		<main className={`grid grid-cols-8 px-4 pt-4 gap-4 ${mediaMain.lg} `}>
			<section
				className={`grid content-start col-span-8 px-10 ${mediaCart.lg} `}
			>
				cart section
			</section>
			<section
				className={`grid content-start col-span-8 px-10 gap-4 ${mediaSummary.lg} `}
			>
				<div id="checkout">
					{clientSecret && (
						<EmbeddedCheckoutProvider
							stripe={stripePromise}
							options={{ clientSecret }}
						>
							<EmbeddedCheckout />
						</EmbeddedCheckoutProvider>
					)}
				</div>
			</section>
		</main>
	)
}


// http://localhost:3000/success?session_id=cs_test_b1mirhgRJUpRRDGm1FugZ3JQpI49wFkj7D2ccxbIUvkaWMvkpsvKh8lfQT