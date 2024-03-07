"use server"

import { addComment } from "@/libs/supabase/supabaseQuery"
import { revalidatePath } from "next/cache"

export const submitComment = async (formData) => {
	const comment = formData.get("comment")
	const product_id = formData.get("product_id")
	const user_id = formData.get("user_id")
	const user_email = formData.get("user_email")

	const comment_id = crypto.randomUUID()

	try {
		if (user_id !== "" && user_email !== "") {
			await addComment(comment_id, user_id, user_email, product_id, comment)
		}
	} catch (error) {
		console.log(error)
	}

	// revalidatePath("/store")
}
