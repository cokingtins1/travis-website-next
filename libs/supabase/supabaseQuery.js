"use server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { useSession } from "./useSession"

export const createServerClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient({ cookies: () => cookieStore })
})

// Order getting functions:

export async function getSupabaseOrderData(order_id) {
	try {
		const { data } = await supabaseClient
			.from("orders")
			.select("*, order_id_alias")
			.match({ stripe_order_id: order_id })
			.select()

		if (data && data.length > 0) {
			const rawData = JSON.parse(data[0].products_sold)

			const orderData = rawData.map((productGroup) => {
				const productName = Object.keys(productGroup)[0]
				const productDetails = productGroup[productName]
				return { name: productName, ...productDetails }
			})

			return { orderData: orderData, orderAlias: data[0].order_id_alias }
		} else {
			return null
		}
	} catch (error) {
		console.log(error)
	}
}

export async function getLikes(
	primaryKey,
	table = "product_likes",
	query = "likes, liked_by_id, liked_by_email",
	primaryKeyKey = "product_id"
) {
	try {
		const matchObj = { [primaryKeyKey]: primaryKey }

		console.log(
			"primaryKey",
			primaryKey,
			"table",
			table,
			"query",
			query,
			"primaryKeyKey",
			primaryKeyKey,
			"matchObj",
			matchObj
		)
		const { data } = await supabaseClient
			.from(table)
			.select(query)
			.match(matchObj)
			.single()

		return data
	} catch (error) {
		console.log(error)
	}
}

export async function addLike(
	likedId,
	user_id,
	user_email,
	table = "product_likes"
) {
	let likes, liked_by_id, liked_by_email

	const likesData = await getLikes(
		likedId,
		"comments",
		"comment_likes, liked_by_id, liked_by_email",
		"comment_id"
	)

	console.log(likesData)

	if (likesData) {
		;({ likes, liked_by_id, liked_by_email } = likesData)
	}

	if (liked_by_id && liked_by_id?.some((user) => user === user_id)) return

	let likesName
	let primaryKey
	switch (table) {
		case "product_likes":
			;(likesName = "likes"), (primaryKey = "product_id")
			break
		case "comments":
			likesName = "comment_likes"
			primaryKey = "comment_id"

			break
		case "replies":
			likesName = "reply_likes"
			primaryKey = "reply_id"
			break
	}

	try {
		const addLike = likes + 1
		const addedLikedById = [...liked_by_id, user_id]
		const addedLikedByEmail = [...liked_by_email, user_email]

		await supabaseClient
			.from("product_likes")
			.update({
				[likesName]: addLike,
				liked_by_id: addedLikedById,
				liked_by_email: addedLikedByEmail,
			})
			.match({ [primaryKey]: likedId })
			.then((res) => {
				if (res.error) {
					console.log(res.error.message)
				}
			})
	} catch (error) {
		console.log(error)
	}
}

export async function getComments(product_id) {
	try {
		const { data: comments } = await supabaseClient
			.from("comments")
			.select("*")
			.match({ product_id: product_id })
			.order("created_at", { ascending: false })

		return comments
	} catch (error) {
		console.log(error)
	}
}

export async function addComment(
	comment_id,
	user_id,
	user_email,
	product_id,
	comment
) {
	try {
		await supabaseClient
			.from("comments")
			.insert({
				comment_id: comment_id,
				user_id: user_id,
				user_email: user_email,
				product_id: product_id,
				comment: comment,
			})
			.then((res) => {
				if (res.error) {
					console.log(res.error.message)
				}
			})
	} catch (error) {
		console.log(error)
	}
}

export async function getReplys(product_id) {
	try {
		const { data: comments } = await supabaseClient
			.from("replies")
			.select("*")
			.match({ product_id: product_id })
			.order("created_at", { ascending: false })

		return comments
	} catch (error) {
		console.log(error)
	}
}

export async function addReply(
	reply,
	comment_id,
	product_id,
	reply_by_user_id,
	reply_by_user_email,
	reply_to_user_id,
	reply_to_user_email,
	reply_id
) {
	console.log(reply_by_user_email, reply_by_user_id)
	try {
		await supabaseClient
			.from("replies")
			.insert({
				reply_id: reply_id,
				comment_id: comment_id,
				product_id: product_id,
				reply_by_user_email: reply_by_user_email,
				reply_by_user_id: reply_by_user_id,
				reply_to_user_email: reply_to_user_email,
				reply_to_user_id: reply_to_user_id,
				reply: reply,
			})
			.then((res) => {
				if (res.error) {
					console.log(res.error.message)
				}
			})
	} catch (error) {
		console.log(error)
	}
}

export async function getLikedByUser(user_id, product_id) {
	const { liked_by_id } = await getLikes(product_id)

	let likedByUser = false
	if (liked_by_id && user_id) {
		likedByUser = liked_by_id?.some((user) => user === user_id)
	}

	return likedByUser
}

export async function getUserId() {
	const { session } = await useSession()

	if (session) {
		const userId = session.user.id
		return userId
	}

	return null
}

export async function getAllProductData() {
	const { data: products } = await supabaseClient.from("products").select()

	return products
}

export async function getProductById(id) {
	try {
		const { data: product } = await supabaseClient
			.from("products")
			.select()
			.match({ id })
			.single()

		if (product) {
			return product
		}
	} catch (error) {
		console.log(error)
	}
}

// File Getting Functions:

export async function getPricingIdById(id) {
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
			return url[0].file_ext
		}
	} catch (error) {
		console.log(error)
	}
}

export async function insertOrderData(data) {
	const supabase = createServerClient()

	await supabase
		.from("orders")
		.insert(data)
		.then((res) => {
			if (res.error) {
				console.log(res.error.message)
			}
		})
}

export async function getDownloadUrls(productsSold) {
	const supabase = createServerClient()

	const filePaths = productsSold.map(
		(product) => `${product.product_id}/${product.pricing_id}`
	)

	const processFilePaths = async (filePaths) => {
		const expiresIn = 60 * 60 * 24 // 1 day
		const result = []

		for (const path of filePaths) {
			const { data } = await supabase.storage
				.from("all_products")
				.createSignedUrl(path, expiresIn, { download: true })
			result.push(data.signedUrl)
		}
		return result
	}

	const downloadUrls = await processFilePaths(filePaths)

	return downloadUrls
}

export async function getAudioSrcById(product_id) {
	const supabase = createServerClient()

	try {
		const { data, error } = await supabase.storage
			.from(`all_products`)
			.list(`${product_id}`, {
				offset: 0,
			})

		if (data) {
			const audioFiles = data.filter(
				(item) =>
					item?.metadata?.mimetype === "audio/mpeg" ||
					item?.metadata?.mimetype === "audio/wav" ||
					item?.metadata?.mimetype === "application/x-zip-compressed"
			)

			let audioFile_MP3 = null
			let audioFile_WAV = null
			let audioFile_STEM = null

			audioFiles.forEach((audioFile) => {
				if (audioFile?.metadata?.mimetype === "audio/mpeg") {
					audioFile_MP3 = audioFile
				} else if (audioFile?.metadata?.mimetype === "audio/wav") {
					audioFile_WAV = audioFile
				} else if (
					audioFile?.metadata?.mimetype ===
					"application/x-zip-compressed"
				) {
					audioFile_STEM = audioFile
				}
			})

			if (audioFile_MP3 || audioFile_WAV || audioFile_STEM) {
				const productFileURL =
					"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

				const audioSrc_MP3 =
					audioFile_MP3 &&
					`${productFileURL}/${product_id}/${audioFile_MP3.name}`
				const audioSrc_WAV =
					audioFile_WAV &&
					`${productFileURL}/${product_id}/${audioFile_WAV.name}`

				const audioSrc_STEM =
					audioFile_STEM &&
					`${productFileURL}/${product_id}/${audioFile_STEM.name}`

				// Send the store the MP3 src by default
				const srcType_MP3 = audioFile_MP3?.metadata?.mimetype
				const srcType_WAV = audioFile_WAV?.metadata?.mimetype
				const srcType_STEM = audioFile_WAV?.metadata?.mimetype

				const storeSrc = audioSrc_MP3 || audioSrc_WAV
				const storeSrcType = srcType_MP3 || srcType_WAV

				return {
					storeSrc,
					storeSrcType,
					audioSrc_MP3,
					srcType_MP3,
					audioSrc_WAV,
					srcType_WAV,
					audioSrc_STEM,
				}
			}
			return
		} else {
			console.log(error)
		}
	} catch (error) {
		console.log(error)
	}
}

export async function getPricingById(id) {
	try {
		const { data: price, error } = await supabaseClient.rpc(
			"get_product_prices",
			{
				p_product_id: id,
			}
		)

		const { data: free } = await supabaseClient
			.from("products")
			.select("free")
			.match({ id })
			.single()

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
				free: free.free,
			}
		}

		return
	} catch (error) {
		console.error("Unexpected error:", error.message)
		return [] // Return an empty array in case of an error
	}
}

export async function getDownloadableImage(product_id) {
	const supabase = createServerClient()
	const productFileURL =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	const { data } = await supabase.storage
		.from(`all_products`)
		.download(`${product_id}/productImage`, {
			transform: {
				width: 100,
				height: 100,
				quality: 80,
			},
		})
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
