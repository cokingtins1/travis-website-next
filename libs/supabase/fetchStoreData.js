"use server"

import {
	getAllColVals,
	getAllProducts,
	getUniqueTags,
} from "@/libs/supabase/supabaseQuery"

export async function fetchStoreData() {
	const products = await getAllProducts()
	const tags = await getUniqueTags()
	const genres = await getAllColVals("genres")
	const moods = await getAllColVals("moods")
	const instruments = await getAllColVals("instruments")

	return {
		products,
		tags,
		genres,
		moods,
		instruments,
	}
}
