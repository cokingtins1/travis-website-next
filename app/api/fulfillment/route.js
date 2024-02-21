import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cache } from "react"

import sgMail from "@sendgrid/mail"

export async function POST(req) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

	const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

	const body = await req.text()
	const sig = headers().get("stripe-signature")

	let event

	try {
		event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
	} catch (error) {
		return NextResponse.json({ status: 400 }, { message: error })
	}

	function getProductPaths(lineItems) {
		let productPaths = []
		const lineItemsData = lineItems.data
		lineItemsData.forEach((lineItem) => {
			productPaths.push(lineItem.price.product.metadata.filePath)
		})

		return productPaths
	}

	async function fulfillOrder(lineItems, sessionData) {
		if (!lineItems || !sessionData) return

		const productPaths = getProductPaths(lineItems)

		//SUPABASE
		const createServerClient = cache(() => {
			const cookieStore = cookies()
			return createServerComponentClient({ cookies: () => cookieStore })
		})
		const supabase = createServerClient()

		await supabase.from("orders").insert({
			stripe_order_id: sessionData.id,
			created_at: new Date(sessionData.created * 1000).toISOString(),
			order_total: sessionData.amount_total / 100,
			customer_name: sessionData.customer_details.name,
			payment_method: sessionData.payment_method_types,
			customer_email: sessionData.customer_details.email,
			products_sold: productPaths,
		})

		// EMAIL

		const customer_email = sessionData.customer_details.email
		// if (customer_email) {
		// 	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
		// 	const msg = {
		// 		to: customer_email,
		// 		from: "cokingtins1@gmail.com",
		// 		subject: "Payment Successful",
		// 		text: "Thank you for your purchase!",
		// 		html: "<p>Thank you for your purchase!</p>",
		// 	}
		// 	try {
		// 		await sgMail.send(msg)
		// 		console.log("email sent")
		// 	} catch (error) {
		// 		console.log(error)
		// 	}
		// }
	}

	switch (event.type) {
		case "payment_intent.created":
			console.log("payment intent created")
			break

		case "payment_intent.succeeded":
			const paymentIntentSucceeded = event.data.object
			console.log("payment intend succeded")
			break

		case "charge.succeeded":
			console.log("charge succeeded")
			break

		case "checkout.session.completed":
			const line_items = await stripe.checkout.sessions.listLineItems(
				event.data.object.id,
				{
					expand: ["data.price.product"],
				}
			)

			const sessionData = await stripe.checkout.sessions.retrieve(
				event.data.object.id,
				{
					expand: ["line_items"],
				}
			)

			await fulfillOrder(line_items, sessionData)

			return NextResponse.json({ status: 200 }, { message: "success" })
		case "checkout.session.expired":
			console.log("checkout session expired")
			break
		default:
			console.log(`Unhandled event type ${event.type}`)
	}
	return NextResponse.json({ status: 200 }, { message: "success" })
}
