"use server"

import { addLike } from "@/libs/supabase/supabaseQuery"
import { revalidatePath } from "next/cache"

export const submitLike = async (formData) => {
	const product_id = formData.get("liked_id")
	const user_id = formData.get("user_id")
	const user_email = formData.get("user_email")

	try {
		if (user_id !== "" && user_email !== "") {
			await addLike(product_id, user_id, user_email, "product_likes")
		}
	} catch (error) {
		console.log(error)
	}

	revalidatePath("/store")
}

export const submitLikeComment = async (formData) => {
	const product_id = formData.get("product_id")
	const comment_id = formData.get("liked_id")
	const user_id = formData.get("user_id")
	const user_email = formData.get("user_email")

	try {
		if (user_id !== "" && user_email !== "") {
			await addLike(comment_id, user_id, user_email, "comments")
		}
	} catch (error) {
		console.log(error)
	}

	revalidatePath(`/store/${product_id}`)
}

export const submitLikeReply = async (formData) => {
	const product_id = formData.get("product_id")
	const reply_id = formData.get("liked_id")
	const user_id = formData.get("user_id")
	const user_email = formData.get("user_email")

	try {
		if (user_id !== "" && user_email !== "") {
			await addLike(reply_id, user_id, user_email, "replies")
		}
	} catch (error) {
		console.log(error)
	}

	revalidatePath(`/store/${product_id}`)
}
