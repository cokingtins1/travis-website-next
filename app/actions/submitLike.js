"use server"

import { addLike } from "@/libs/supabase/supabaseQuery"
import { revalidatePath } from "next/cache"

export const submitLike = async (formData) => {
	const product_id = formData.get("id")
	const user_id = formData.get("user_id")
	const user_email = formData.get("user_email")


	try {
		if (user_id !== "" && user_email !== "") {
			await addLike(product_id, user_id, user_email)
		}
	} catch (error) {
		console.log(error)
	}

	revalidatePath("/store")
}
