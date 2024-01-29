"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import dayjs from "dayjs"

const supabase = createServerActionClient({ cookies })

export async function addProducts(formData) {
	console.log("submitting form on server")
	try {
		await supabase.from("products").insert({
			files: formData.files,
			image: formData.image,
			title: formData.title,
			type: formData.type,
			release_date: formData.releaseDate,
			release_date_long: dayjs(formData.releaseDate).format(
				"MMMM D, YYYY "
			),
			description: formData.description,
			tags: formData.tags.map((tag) => tag.name),
			genres: formData.genres.map((tag) => tag.name),
			moods: formData.moods.map((tag) => tag.name),
			keys: formData.keys,
			bpm: formData.bpm,
			instruments: formData.instruments.map((tag) => tag.name),
			price: formData.price,
		})
	} catch (error) {
		console.log(error)
	}
}
