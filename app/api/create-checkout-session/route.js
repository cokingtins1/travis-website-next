import Stripe from "stripe"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(req) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
	const data = await req.json()

	const origin = headers().get("origin")


	const lineItems = data.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: item.product_name,
			},
			unit_amount: item.price * 100,
		},
		quantity: 1,
	}))

	const session = await stripe.checkout.sessions.create({
		ui_mode: "embedded",
        line_items: lineItems,
        mode: 'payment',
        return_url: `${origin}/success`
	})

    return NextResponse.json({clientSecret: session.client_secret})
}
