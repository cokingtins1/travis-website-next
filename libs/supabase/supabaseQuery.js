import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

import supabaseClient from "@/libs/supabase/config/supabaseClient"

export const createServerClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient({ cookies: () => cookieStore })
})

export async function getProductFilesById(id) {
	const supabase = createServerClient()
	supabase.auth.getUser()
	const { data: productsFiles } = await supabase.storage.from("").select()

	return productsFiles
}

export async function getAllProductData() {
	const { data: products } = await supabaseClient.from("products").select()

	return products
}

export async function getProductById(id) {
	const { data: product } = await supabaseClient
		.from("products")
		.select()
		.match({ id })
		.single()

	return product
}

export async function getStartingPrice(id) {
	const { data: price } = await supabaseClient
		.from("products")
		.select("basic_price, premium_price, exclusive_price")
		.match({ id })

	if (price) {
		const pricingArray = [].concat(
			...price.map((price) => Object.values(price))
		)

		const sortedPrices = pricingArray.sort((a, b) => a - b)
		return sortedPrices[0]
	}
	return
}

export async function getImageSrc(upload_id) {
	const supabase = createServerClient()
	const productFileURL =
	"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	const { data } = await supabase.storage
		.from(`all_products`)
		.list(`${upload_id}/productImage`, {
			offset: 0,
		})

	if (data.length > 0) {
		const imageData = data[0]
		const src = `${productFileURL}/${upload_id}/productImage/${imageData.name}`

		return src
	}

	return null
}

export async function getUniqueTags() {
	const { data: tags } = await supabaseClient.rpc("get_unique_tags")

	if (tags) {
		return tags
	}
	return null
}

export async function getUniqueGenres() {
	const { data: genres } = await supabaseClient.rpc("get_unique_genres")

	if (genres) {
		return genres
	}
	return null
}

export async function getAllColVals(columnName) {
	const { data } = await supabaseClient.from("products").select(columnName)

	if (data) {
		return data.reduce((acc, obj) => {
			return acc.concat(obj[columnName])
		}, [])
	}
	return null
}
