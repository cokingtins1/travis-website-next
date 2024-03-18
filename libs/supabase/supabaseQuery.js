"use server"

import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { useSession } from "./useSession"

// Order getting functions:

export async function getSupabaseOrderData(order_id) {
	try {
		const { data } = await supabaseClient
			.from("orders")
			.select("*")
			.match({ stripe_order_id: order_id })
			.single()

		const rawData = JSON.parse(data.products_sold)

		const orderData = rawData.map((productGroup) => {
			const productName = Object.keys(productGroup)[0]
			const productDetails = productGroup[productName]
			return { name: productName, ...productDetails }
		})

		return orderData

		// if (data) {

		// 	// orderAlias: data[0].order_id_alias
		// 	return orderData
		// } else {
		// 	return null
		// }
	} catch (error) {
		console.log(error)
	}
}

export async function getLikes(product_id) {
	try {
		const { data } = await supabaseClient
			.from("product_likes")
			.select("likes, liked_by_id, liked_by_email")
			.match({ product_id: product_id })
			.single()

		return data
	} catch (error) {
		console.log(error)
	}
}

export async function getCommentLikes(comment_id) {
	try {
		const { data } = await supabaseClient
			.from("comments")
			.select("comment_likes, liked_by_id, liked_by_email")
			.match({ comment_id: comment_id })
			.single()

		return data
	} catch (error) {
		console.log(error)
	}
}

export async function getReplyLikes(reply_id) {
	try {
		const { data } = await supabaseClient
			.from("replies")
			.select("reply_likes, liked_by_id, liked_by_email")
			.match({ reply_id: reply_id })
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
	let result
	let likesName
	let primaryKey
	let likes

	if (table === "product_likes") {
		result = await getLikes(likedId)
		likes = result.likes
		likesName = "likes"
		primaryKey = "product_id"
	} else if (table === "comments") {
		result = await getCommentLikes(likedId)
		likes = result.comment_likes
		likesName = "comment_likes"
		primaryKey = "comment_id"
	} else if (table === "replies") {
		result = await getReplyLikes(likedId)
		likes = result.reply_likes
		likesName = "reply_likes"
		primaryKey = "reply_id"
	}

	if (
		result?.liked_by_id &&
		result?.liked_by_id?.some((user) => user === user_id)
	)
		return

	try {
		const addLike = likes + 1
		const addedLikedById = [...result.liked_by_id, user_id]
		const addedLikedByEmail = [...result.liked_by_email, user_email]

		await supabaseClient
			.from(table)
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
	reply_to_reply,
	reply_id
) {
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
				reply_to_reply: reply_to_reply,
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
	// const data = await getLikes(product_id)

	// const liked_by_id = data?.liked_by_id

	let likedByUser = false
	if (liked_by_id && user_id) {
		likedByUser = liked_by_id?.some((user) => user === user_id)
	}

	return likedByUser
}

export async function likedByUser() {
	const { data } = await supabaseClient
		.from("product_likes")
		.select("product_id, liked_by_id")

	return data
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
			.match({ product_id: id })
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
	await supabaseClient
		.from("orders")
		.insert(data)
		.then((res) => {
			if (res.error) {
				console.log(res.error.message)
			}
		})
}

export async function getDownloadUrls(productsSold) {
	const filePaths = productsSold.map(
		(product) => `${product.product_id}/${product.pricing_id}`
	)

	const processFilePaths = async (filePaths) => {
		const expiresIn = 60 * 60 * 24 // 1 day
		const result = []

		for (const path of filePaths) {
			const { data } = await supabaseClient.storage
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
	try {
		const { data, error } = await supabaseClient.storage
			.from(`all_products`)
			.list(`${product_id}`, {
				offset: 0,
			})

		if (error) {
			throw new Error(error.message)
		}

		if (data) {
			const audioFiles = data.filter((item) =>
				[
					"audio/mpeg",
					"audio/wav",
					"application/x-zip-compressed",
				].includes(item?.metadata?.mimetype)
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

				// Corrected assignment of srcType_STEM
				const srcType_MP3 = audioFile_MP3?.metadata?.mimetype
				const srcType_WAV = audioFile_WAV?.metadata?.mimetype
				const srcType_STEM = audioFile_STEM?.metadata?.mimetype

				const storeSrc = audioSrc_MP3 || audioSrc_WAV
				const storeSrcType = srcType_MP3 || srcType_WAV || srcType_STEM

				return {
					storeSrc,
					storeSrcType,
					audioSrc_MP3,
					srcType_MP3,
					audioSrc_WAV,
					srcType_WAV,
					audioSrc_STEM,
					srcType_STEM,
				}
			}
		}
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch audio source by ID")
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
			.match({ product_id: id })
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
	const productFileURL =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	const { data } = await supabaseClient.storage
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
	const productFileURL =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	const { data } = await supabaseClient.storage
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

export async function getImages() {
	const productFileURL =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	// https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/4d337ff9-675a-4470-bd88-74b5ccfd2ace/productImage/5AM Freestyle.jpg

	const { data } = await supabaseClient
		.from("products")
		.select("product_id, image_name")

	const imageSources = data.map((product) => ({
		...product,
		imageSrc: `${productFileURL}/${product.product_id}/productImage/${product.image_name}`,
	}))

	return imageSources
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
