"use server"

import { addReply } from "@/libs/supabase/supabaseQuery"
import { revalidatePath } from "next/cache"

export const submitReply = async (formData) => {

	const reply = formData.get("reply")
	const comment_id = formData.get("comment_id")
	const reply_by_user_id = formData.get("reply_by_user_id")
	const reply_by_user_email = formData.get("reply_by_user_email")
	const reply_to_user_id = formData.get("reply_to_user_id")
	const reply_to_user_email = formData.get("reply_to_user_email")
	const product_id = formData.get("product_id")

	const reply_id = crypto.randomUUID()

	try {
		if (reply_by_user_id !== "" && reply_by_user_email !== "") {
			await addReply(
				reply,
				comment_id,
				product_id,
				reply_by_user_id,
				reply_by_user_email,
				reply_to_user_id,
				reply_to_user_email,
				reply_id, 
			)
		}
	} catch (error) {
		console.log(error)
	}

	revalidatePath(`/store/${product_id}`)
}
