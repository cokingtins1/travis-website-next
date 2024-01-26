"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerActionClient({ cookies })

export async function addProducts(formData) {
	console.log("submitting form on server")
	try {
		await supabase.from("products").insert({
			// files: formData.files,
			// image: formData.image,
			title: formData.title,
			type: formData.type,
			// releaseDate: formData.releaseDate,
			description: formData.description,
			// tags: formData.tags,
			// genres: formData.genres,
			// moods: formData.moods,
			// keys: formData.keys,
			bpm: formData.bpm,
			// instruments: formData.instruments,
		})
	} catch (error) {
		console.log(error)
	}
}
