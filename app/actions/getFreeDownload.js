"use server"

import {
	getAudioSrcById,
	getProductById,
} from "@/libs/supabase/supabaseQuery"
import sgMail from "@sendgrid/mail"
import supabaseClient from "@/libs/supabase/config/supabaseClient"
import dayjs from "dayjs"

export const getFreeDownload = async (formData) => {
	const name = formData.get("name")
	const email = formData.get("email")
	const productId = formData.get("productId")
	const imageSrc = formData.get("imageSrc")

	const { storeSrc } = await getAudioSrcById(productId)
	const path = storeSrc.split("all_products/")[1]

	const product_data = await getProductById(productId)

	const supabaseOrderId = crypto.randomUUID()
	const order_date = dayjs().format("dddd, MMMM D, YYYY h:mm A")

	const { data: url } = supabaseClient.storage
		.from("all_products")
		.getPublicUrl(path, { download: true })

    

	const order = [
		{
			Product: {
				productName: product_data.title,
				productPrice: "Free",
                productType: "BASIC",
				signedUrl: url.publicUrl,
				imageSrc: imageSrc,
			},
		},
	]

	if (email) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY)
		const msg = {
			from: "cokingtins1@gmail.com",
			personalizations: [
				{
					to: email,
					dynamic_template_data: {
						subject: "Free Download From trav!",
						order_id: supabaseOrderId,
						order_date: order_date,
						order_total: "Free",
						order: order,
					},
				},
			],
			template_id: process.env.SENDGRID_TEMPLATE_ID,
		}
		try {
			const res = await sgMail.send(msg)
		} catch (error) {
			console.log(error)
		}
	}

}
