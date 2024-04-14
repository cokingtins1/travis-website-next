import { NextResponse } from "next/server";
import { headers } from "next/headers";

import Stripe from "stripe";
import { getDownloadUrls } from "@/libs/supabase/supabaseQuery";

export async function POST(req) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	const data = await req.json();
	const origin = headers().get("origin");
	const signedUrls = await getDownloadUrls(data);

	if (!signedUrls) return;

	for (let i = 0; i < data.length && i < signedUrls.length; i++) {
		data[i].signedUrl = signedUrls[i];
	}

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
					productType: item.type,
					productPrice: item.price,
					imageSrc: item.imageSrc,
					signedUrl: item.signedUrl,
				},
			},
			unit_amount: item.price * 100,
		},
		quantity: 1,
	}));

	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		line_items: lineItems,
		success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${origin}/store`,
	});

	return NextResponse.json(session.url);
}
