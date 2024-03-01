import { NextResponse } from "next/server"
import { headers } from "next/headers"

import Stripe from "stripe"

export async function POST(req) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
	const data = await req.json()

	const origin = headers().get("origin")

	const lineItems = data.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: item.product_name,
				metadata: {
					productId: item.product_id,
					pricingId: item.pricing_id,
					productName: item.product_name,
					filePath: `${item.product_id}/${item.pricing_id}`,
					type: item.type,
					price: item.price,
					imageSrc: item.imageSrc,
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
