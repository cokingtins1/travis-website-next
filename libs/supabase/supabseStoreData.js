"use server"

import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { useSession } from "./useSession"
import { likedByUser } from "./supabaseQuery"

async function getAllProductData() {
	const { data, error } = await supabaseClient.rpc("get_product_data")
	return data
}

export async function constructData() {
	const start = Date.now()

	const data = await getAllProductData()
	const { session } = await useSession()

	const userId = session?.user.id

	const likeData = await likedByUser()

	for (const item of data) {
		const activePrices = item.pricing.filter((price) => price.is_active)
		const lowestPrice = activePrices.reduce((lowest, current) => {
			if (
				current.price < lowest.price ||
				(!lowest.type_id && current.type_id === "basic")
			) {
				return current
			} else {
				return lowest
			}
		}, {})
		item.startingPrice = lowestPrice
			? Object.fromEntries(Object.entries(lowestPrice))
			: null

		const isFree = item.product_data.free
		item.isFree = isFree

		const productLikes = item.product_likes.likes
		item.productLikes = productLikes

		if (session) {
			const likedByArray = likeData.find(
				(p) => p.product_id === item.product_data.product_id
			)

			const likedByUser = likedByArray.liked_by_id.includes(userId)

			item.session = session
			item.likedByUser = likedByUser
		} else {
			item.likedByUser = false
			item.session = null
		}
	}
	const end = Date.now()
	// console.log(end - start)

	return data
}
