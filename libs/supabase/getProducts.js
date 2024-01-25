"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// import supabase from "./config/supabaseClient"

const supabase = createServerActionClient({ cookies })

export async function getProducts() {
	try {
		const { data, error } = await supabase.from("products").select()

		if (!data) {
			throw new Error("Failed to fetch products", error)
		}

		return data
	} catch (error) {
		console.log("Error loading products", error)
	}
}

export async function addProducts(formData) {
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

		if (!data) {
			throw new Error("Failed to add product", error)
		}
	} catch (error) {
		console.log(error)
	}

	// try {
	// 	const { data, error } = await supabase.from("products").insert({
	// 		// files: formData.files,
	// 		// image: formData.image,
	// 		title: formData.title,
	// 		type: formData.type,
	// 		// releaseDate: formData.releaseDate,
	// 		description: formData.description,
	// 		// tags: formData.tags,
	// 		// genres: formData.genres,
	// 		// moods: formData.moods,
	// 		// keys: formData.keys,
	// 		bpm: formData.bpm,
	// 		// instruments: formData.instruments,
	// 	})

	// 	if (!data) {
	// 		throw new Error("Failed to add product", error)
	// 	}
	// } catch (error) {
	// 	console.log(error)
	// }
}
