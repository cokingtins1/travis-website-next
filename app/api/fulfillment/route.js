import { NextResponse } from "next/server";
import { headers } from "next/headers";

import dayjs from "dayjs";

import sgMail from "@sendgrid/mail";
import { insertOrderData } from "@/libs/supabase/supabaseQuery";
import { getStripe } from "../../../libs/stripe/stripe";

export async function POST(req) {
	const stripe = getStripe();

	const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

	const body = await req.text();
	const sig = headers().get("stripe-signature");

	let event;

	try {
		event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
	} catch (error) {
		return NextResponse.json({ status: 400 }, { message: error });
	}

	function logOrderInfo(lineItems) {
		const productsSold = [];
		const lineItemsData = lineItems.data;
		lineItemsData.forEach((lineItem, index) => {
			const {
				productId,
				pricingId,
				productName,
				productType,
				productPrice,
				filePath,
				imageSrc,
				signedUrl,
			} = lineItem.price.product.metadata;

			const product = {
				[`Product ${index + 1}`]: {
					productId,
					pricingId,
					productName,
					productType,
					productPrice,
					filePath,
					imageSrc,
					signedUrl,
				},
			};

			productsSold.push(product);
		});

		return productsSold;
	}

	async function fulfillOrder(lineItems, sessionData) {
		if (!lineItems || !sessionData) return;

		const productsSold = logOrderInfo(lineItems);

		const orderDetails = {
			stripe_order_id: sessionData.id,
			created_at: new Date(sessionData.created * 1000).toISOString(),
			created_at_long: dayjs
				.unix(sessionData.created)
				.format("dddd, MMMM D, YYYY h:mm A"),
			order_total: sessionData.amount_total / 100,
			customer_name: sessionData.customer_details.name,
			payment_method: sessionData.payment_method_types,
			customer_email: sessionData.customer_details.email,
			products_sold: JSON.stringify(productsSold),
			productsSoldArray: productsSold,
		};

		const supabaseData = {
			stripe_order_id: sessionData.id,
			order_id_alias:
				Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
			created_at: new Date(sessionData.created * 1000).toISOString(),
			order_total: sessionData.amount_total / 100,
			customer_name: sessionData.customer_details.name,
			payment_method: sessionData.payment_method_types,
			customer_email: sessionData.customer_details.email,
			products_sold: [JSON.stringify(productsSold)],
		};

		//SUPABASE

		await insertOrderData(supabaseData);

		// EMAIL

		const customer_email = sessionData.customer_details.email;
		if (customer_email) {
			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			const msg = {
				from: "beatsmadebytrav@gmail.com",
				personalizations: [
					{
						to: customer_email,
						dynamic_template_data: {
							subject: `Beats Download - Order#: ${orderDetails.stripe_order_id}`,
							order_id: orderDetails.stripe_order_id,
							order_date: orderDetails.created_at_long,
							order_total: orderDetails.order_total,
							order: productsSold,
						},
					},
				],
				template_id: process.env.SENDGRID_TEMPLATE_ID,
			};
			try {
				const res = await sgMail.send(msg);
			} catch (error) {
				console.log(error);
			}
		}
	}

	switch (event.type) {
		case "payment_intent.created":
			console.log("payment intent created");
			break;

		case "payment_intent.succeeded":
			const paymentIntentSucceeded = event.data.object;
			console.log("payment intend succeded");
			break;

		case "charge.succeeded":
			console.log("charge succeeded");
			break;

		case "checkout.session.completed":
			const line_items = await stripe.checkout.sessions.listLineItems(
				event.data.object.id,
				{
					expand: ["data.price.product"],
				}
			);

			const sessionData = await stripe.checkout.sessions.retrieve(
				event.data.object.id,
				{
					expand: ["line_items"],
				}
			);

			await fulfillOrder(line_items, sessionData);

			return NextResponse.json({ status: 200 }, { message: "success" });
		case "checkout.session.expired":
			console.log("checkout session expired");
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}
	return NextResponse.json({ status: 200 }, { message: "success" });
}
