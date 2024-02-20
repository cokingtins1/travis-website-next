import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import sgMail from "@sendgrid/mail"
import { SmartButton } from "@mui/icons-material"

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

	async function fulfillOrder(lineItems) {
		let filesToSend = []
		const lineItemsData = lineItems.data
		lineItemsData.forEach((lineItem) => {
			filesToSend.push(lineItem.price.product.metadata.filePath)
		})

		sgMail.setApiKey(process.env.SENDGRID_API_KEY)

		const msg = {
			to: "seancokingtin@gmail.com", // Replace with the customer's email
			from: "cokingtins1@gmail.com", // Replace with your email
			subject: "Payment Successful",
			text: "Thank you for your purchase!",
			html: "<p>Thank you for your purchase!</p>",
		}

		try {
			await sgMail.send(msg)
			console.log("email sent")
		} catch (error) {
			console.log(error)
		}
	}

	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntentSucceeded = event.data.object
			console.log("payment intend succeded")
			// Then define and call a function to handle the event payment_intent.succeeded
			break
		// ... handle other event types
		case "checkout.session.completed":
			const sessionWithLineItems =
				await stripe.checkout.sessions.retrieve(event.data.object.id, {
					expand: ["line_items"],
				})
			const line_items = await stripe.checkout.sessions.listLineItems(
				event.data.object.id,
				{
					expand: ["data.price.product"],
				}
			)
			const lineItems = sessionWithLineItems.line_items
			await fulfillOrder(line_items)
			return NextResponse.json({ status: 200 }, { message: "success" })

		default:
			console.log(`Unhandled event type ${event.type}`)
	}
	return NextResponse.json({ status: 200 }, { message: "success" })
}
