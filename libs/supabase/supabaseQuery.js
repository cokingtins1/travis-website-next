import supabaseClient from "@/libs/supabase/config/supabaseClient"

export async function getAllProducts() {
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

export async function getProductCosting(id) {
	const { data: price } = await supabaseClient
		.from("products")
		.select("price")
		.match({ id })
		.single()

	// Need to make this better...
	if (price) {
		const {
			price: {
				basic: { checked: basicChecked, price: basicPrice },
				premium: { checked: premiumChecked, price: premiumPrice },
				exclusive: { checked: exclusiveChecked, price: exclusivePrice },
			},
		} = price

		const basic = price.price.basic.checked ? price.price.basic.price : 0
		const premium = price.price.premium.checked
			? price.price.premium.price
			: 0
		const exclusive = price.price.exclusive.checked
			? price.price.exclusive.price
			: 0

		const priceArray = [basic, premium, exclusive].filter(
			(value) => value !== 0
		)

		return Math.min(...priceArray)
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
