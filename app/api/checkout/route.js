import { NextResponse } from "next/server"
import { headers } from "next/headers"

import Stripe from "stripe"

export async function POST(req) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
	const data = await req.json()

	const origin = headers().get("origin")

	// store file path of supabase storage item as product_id/pricing_id
	const lineItems = data.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: item.product_name,
				metadata: {
					filePath: `${item.product_id}/${item.pricing_id}`,
				},
			},
			unit_amount: item.price * 100,
		},
		quantity: 1,
	}))

	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		line_items: lineItems,
		success_url: `${origin}/checkout/success`,
		cancel_url: `${origin}/checkout/canceled`,
	})

	return NextResponse.json(session.url)
}
