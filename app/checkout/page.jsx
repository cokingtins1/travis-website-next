"use client"

import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
	Elements,
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import { useShoppingCart } from "@/libs/contexts/CartContext"
import CartItem from "../components/Header/Shopping Cart Components/CartItem"

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Page() {
	const { shoppingCart } = useShoppingCart()
	const [clientSecret, setClientSecret] = useState("")
	const [stripePromise, setStripePromise] = useState(() =>
		loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
	)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (shoppingCart.length > 0) {
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
					setLoading(false)
				}
			}
		}
		fetchData()
	}, [shoppingCart])

	const media = {
		mainLg: "lg:grid-cols-12",
		cartLg: "lg:col-span-7 px-2",
		summaryLg: "lg:col-span-5 px-2",
	}

	const options = {
		clientSecret: `{{${clientSecret}}}`,
	}

	return (
		<>
			{!loading && clientSecret && (
				<main
					className={`grid grid-cols-8 px-4 pt-4 gap-4 ${media.mainLg} `}
				>
					<section
						className={`grid content-start col-span-8 px-10 ${media.cartLg} `}
					>
						<Elements stripe={stripePromise}>
							{shoppingCart.map((item, index) => (
								<CartItem key={index} cartItem={item} />
							))}
						</Elements>
					</section>
					<section
						className={`grid content-start col-span-8 px-10 gap-4 ${media.summaryLg} `}
					>
						{shoppingCart.length > 0 && (
							<EmbeddedCheckoutProvider
								key={clientSecret}
								stripe={stripePromise}
								options={{ clientSecret }}
							>
								<EmbeddedCheckout />
							</EmbeddedCheckoutProvider>
						)}
					</section>
				</main>
			)}
		</>
	)
}
