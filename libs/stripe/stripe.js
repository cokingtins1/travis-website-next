import Stripe from "stripe"

import supabaseClient from "@/libs/supabase/config/supabaseClient"

export async function getStripeOrderData(order_id) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

	const session = await stripe.checkout.sessions.retrieve(order_id)
	// console.log("customer:", session.customer_details)
}
