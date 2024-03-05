"use server"

import { addLike } from "@/libs/supabase/supabaseQuery"
import { revalidatePath } from "next/cache"

export const submitLike = async (formData) => {
	const product_id = formData.get("id")
	const user_id = formData.get("user_id")
	const user_email = formData.get("id")

	try {
		if (user_id !== "") await addLike(product_id)
	} catch (error) {
		console.log(error)
	}

	revalidatePath("/store")
}
