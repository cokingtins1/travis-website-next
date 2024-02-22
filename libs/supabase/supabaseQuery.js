import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

import supabaseClient from "@/libs/supabase/config/supabaseClient"

export const createServerClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient({ cookies: () => cookieStore })
})

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

// File Getting Functions:

export async function getProductFilePathById(id) {
	// path to file is product_id/pricing_id
	// will have product_id from params ->

	// within product_files table, group file_extension with file_url

	try {
		const { data: url, error } = await supabaseClient.rpc(
			"get_product_url",
			{
				p_product_id: id,
			}
		)
		if (error) {
			console.error("Error:", error)
		} else {
			return { pricingId: url[0].file_ext, url_file: url }
		}
	} catch (error) {
		console.log(error)
	}
}

export async function getProductFilesById(id) {
	const supabase = createServerClient()
	supabase.auth.getUser()
	const { data: productsFiles } = await supabase.storage.from("").select()

	return productsFiles
}

export async function getPricingById(id) {
	try {
		const { data: price, error } = await supabaseClient.rpc(
			"get_product_prices",
			{
				p_product_id: id,
			}
		)

		if (error) {
			console.error("Error:", error)
		} else {
			const sortedArray = price[0].type_ids
				.map((type, index) => {
					return {
						name: type,
						price: price[0].prices[index],
						pricing_id: price[0].pricing_ids[index],
						product_id: price[0].product_ids[index],
						isActive: price[0].is_active[index],
					}
				})
				.sort((a, b) => a.price - b.price)

			const basicPrice = sortedArray
				.filter((item) => item.name === "basic")
				.map(({ name, price, isActive }) => ({
					[name]: { price, isActive },
				}))
				.find(Boolean)

			const premiumPrice = sortedArray
				.filter((item) => item.name === "premium")
				.map(({ name, price, isActive }) => ({
					[name]: { price, isActive },
				}))
				.find(Boolean)

			const exclusivePrice = sortedArray
				.filter((item) => item.name === "exclusive")
				.map(({ name, price, isActive }) => ({
					[name]: { price, isActive },
				}))
				.find(Boolean)

			const pricingShort = {
				...basicPrice,
				...premiumPrice,
				...exclusivePrice,
			}

			const filteredArray = sortedArray.filter(
				(obj) => obj.isActive === true
			)

			return {
				// price return a [prices: [30, 350, 125], type_ids:['basic', exclusive', 'premium'], pricing_id:[three unique ids], product_id:[three ids (all the same)]}]

				// sortedArray returns array of objs. [{name: 'basic', price: 30}...] that is sorted by price.

				startingPrice: filteredArray[0],
				pricing: sortedArray,
				pricingShort: pricingShort,
				filteredPricing: filteredArray,
			}
		}

		return
	} catch (error) {
		console.error("Unexpected error:", error.message)
		return [] // Return an empty array in case of an error
	}
}

export async function getImageSrc(product_id) {
	const supabase = createServerClient()
	const productFileURL =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	const { data } = await supabase.storage
		.from(`all_products`)
		.list(`${product_id}/productImage`, {
			offset: 0,
		})

	if (data && data.length > 0) {
		const imageData = data[0]
		const src = `${productFileURL}/${product_id}/productImage/${imageData.name}`

		return src
	}

	return null
}

// Filter and Pricing Functions:

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
