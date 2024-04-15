"use server";

import {
	getDownloadUrls,
	getProductById,
	insertOrderData,
} from "@/libs/supabase/supabaseQuery";
import sgMail from "@sendgrid/mail";
import supabaseClient from "@/libs/supabase/config/supabaseClient";
import dayjs from "dayjs";

export const getFreeDownload = async (formData) => {
	const name = formData.get("name");
	const email = formData.get("email");
	const productId = formData.get("productId");
	const imageSrc = formData.get("imageSrc");

	const product_data = await getProductById(productId);

	const freeOrderData = [
		{
			pricing_id: "",
			product_id: productId,
			product_name: product_data.title,
			price: 0,
			type: "FREE",
			imageSrc: imageSrc,
		},
	];
	const signedUrls = await getDownloadUrls(freeOrderData);

	const supabaseOrderId = crypto.randomUUID();
	const order_date = dayjs().format("dddd, MMMM D, YYYY h:mm A");

	const order = [
		{
			Product: {
				productName: product_data.title,
				productPrice: "Free",
				productType: "BASIC",
				signedUrl: signedUrls[0],
				imageSrc: imageSrc,
			},
		},
	];

	const supabaseData = {
		stripe_order_id: `FREE DOWNLOAD_${crypto.randomUUID()}`,
		order_id_alias:
			Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
		created_at: new Date().toISOString(),
		order_total: 0,
		customer_name: name,
		payment_method: null,
		customer_email: email,
		products_sold: [JSON.stringify(order[0])],
	};

	await insertOrderData(supabaseData);


	if (email) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			from: "beatsmadebytrav@gmail.com",
			personalizations: [
				{
					to: email,
					dynamic_template_data: {
						subject: "Free Download From trav!",
						order_id: supabaseOrderId,
						order_date: order_date,
						order_total: "0",
						order: order,
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
};
