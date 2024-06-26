"use server";

import supabaseClient from "@/libs/supabase/config/supabaseClient";
import { getSession } from "./getSession";
import { unstable_cache } from "next/cache";
import { utapi } from "@/app/actions/server/uploadthing";

// Order getting functions:

export async function getSupabaseOrderData(order_id) {
	const { data } = await supabaseClient
		.from("orders")
		.select("*")
		.match({ stripe_order_id: order_id })
		.single();

	if (!data) return null;

	const rawData = JSON.parse(data.products_sold);
	const customerEmail = data.customer_email;
	const orderAlias = data.order_id_alias;
	const orderDate = data.created_at;

	const orderData = rawData.map((productGroup) => {
		const productName = Object.keys(productGroup)[0];
		const productDetails = productGroup[productName];
		return {
			name: productName,
			...productDetails,
			orderDate,
			customerEmail,
			orderAlias,
		};
	});
	return orderData;
}

export async function getLikes(product_id) {
	try {
		const { data } = await supabaseClient
			.from("product_likes")
			.select("likes, liked_by_id, liked_by_email")
			.match({ product_id: product_id })
			.single();

		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getCommentLikes(comment_id) {
	try {
		const { data } = await supabaseClient
			.from("comments")
			.select("comment_likes, liked_by_id, liked_by_email")
			.match({ comment_id: comment_id })
			.single();

		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getReplyLikes(reply_id) {
	try {
		const { data } = await supabaseClient
			.from("replies")
			.select("reply_likes, liked_by_id, liked_by_email")
			.match({ reply_id: reply_id })
			.single();

		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function addLike(
	likedId,
	user_id,
	user_email,
	table = "product_likes"
) {
	let result;
	let likesName;
	let primaryKey;
	let likes;

	if (table === "product_likes") {
		result = await getLikes(likedId);
		likes = result.likes;
		likesName = "likes";
		primaryKey = "product_id";
	} else if (table === "comments") {
		result = await getCommentLikes(likedId);
		likes = result.comment_likes;
		likesName = "comment_likes";
		primaryKey = "comment_id";
	} else if (table === "replies") {
		result = await getReplyLikes(likedId);
		likes = result.reply_likes;
		likesName = "reply_likes";
		primaryKey = "reply_id";
	}

	if (
		result?.liked_by_id &&
		result?.liked_by_id?.some((user) => user === user_id)
	)
		return;

	try {
		const addLike = likes + 1;
		const addedLikedById = [...result.liked_by_id, user_id];
		const addedLikedByEmail = [...result.liked_by_email, user_email];

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
					console.log(res.error.message);
				}
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getComments(product_id) {
	try {
		const { data: comments } = await supabaseClient
			.from("comments")
			.select("*")
			.match({ product_id: product_id })
			.order("created_at", { ascending: false });

		return comments;
	} catch (error) {
		console.log(error);
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
					console.log(res.error.message);
				}
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getReplys(product_id) {
	try {
		const { data: comments } = await supabaseClient
			.from("replies")
			.select("*")
			.match({ product_id: product_id })
			.order("created_at", { ascending: false });

		return comments;
	} catch (error) {
		console.log(error);
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
					console.log(res.error.message);
				}
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getLikedByUser(user_id, product_id) {
	const { liked_by_id } = await getLikes(product_id);
	// const data = await getLikes(product_id)

	// const liked_by_id = data?.liked_by_id

	let likedByUser = false;
	if (liked_by_id && user_id) {
		likedByUser = liked_by_id?.some((user) => user === user_id);
	}

	return likedByUser;
}

export async function likedByUser() {
	const { data } = await supabaseClient
		.from("product_likes")
		.select("product_id, liked_by_id");

	return data;
}

export async function getUserId() {
	const { session } = await getSession();

	if (session) {
		const userId = session.user.id;
		return userId;
	}

	return null;
}

export const getAllProductData = unstable_cache(
	async () => {
		const { data: products } = await supabaseClient
			.from("products")
			.select();

		return products;
	},
	["dashboardData"],
	{ tags: ["dashboardData"] }
);

export async function getProductById(id) {
	try {
		const { data: product } = await supabaseClient
			.from("products")
			.select()
			.match({ product_id: id })
			.single();

		if (product) {
			return product;
		}
	} catch (error) {
		console.log(error);
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
		);
		if (error) {
			console.error("Error:", error);
		} else {
			return url[0].file_ext;
		}
	} catch (error) {
		console.log(error);
	}
}

export async function insertOrderData(data) {
	await supabaseClient
		.from("orders")
		.insert(data)
		.then((res) => {
			if (res.error) {
				console.log(res.error.message);
			}
		});
}

export async function getDownloadUrls(productsSold) {
	const getUrls = async (filePaths) => {
		const result = [];

		for (const product of filePaths) {
			let typeExt;
			switch (product.type) {
				case "FREE":
					typeExt = ".mp3";
					break;
				case "BASIC":
					typeExt = ".wav";
					break;
				case "PREMIUM":
					typeExt = ".zip";
					break;
				case "EXCLUSIVE":
					typeExt = ".zip";
					break;
				default:
					typeExt = ".mp3";
					break;
			}

			const { data } = await supabaseClient
				.from("product_files")
				.select("storage_key")
				.match({ product_id: product.product_id })
				.match({ file_extension: typeExt })
				.single();

			result.push(data.storage_key);
		}

		return result;
	};

	const storageKeys = await getUrls(productsSold);

	const processFilePath = async (storageKeys) => {
		const expiresIn = 60 * 60 * 24 * 7;
		const result = [];

		for (const key of storageKeys) {
			if (!key) return;
			const url = await utapi.getSignedURL(key, {
				expiresIn: expiresIn,
			});

			result.push(url);
		}
		return result;
	};

	const downloadUrls = await processFilePath(storageKeys);

	return downloadUrls;
}

export async function getPricingById(id) {
	try {
		const { data: price, error } = await supabaseClient.rpc(
			"get_product_prices",
			{
				p_product_id: id,
			}
		);

		const { data: free } = await supabaseClient
			.from("products")
			.select("free")
			.match({ product_id: id })
			.single();

		if (error) {
			console.error("Error:", error);
		} else {
			const sortedArray = price[0].type_ids
				.map((type, index) => {
					return {
						name: type,
						price: price[0].prices[index],
						pricing_id: price[0].pricing_ids[index],
						product_id: price[0].product_ids[index],
						isActive: price[0].is_active[index],
					};
				})
				.sort((a, b) => a.price - b.price);

			const basicPrice = sortedArray
				.filter((item) => item.name === "basic")
				.map(({ name, price, isActive }) => ({
					[name]: { price, isActive },
				}))
				.find(Boolean);

			const premiumPrice = sortedArray
				.filter((item) => item.name === "premium")
				.map(({ name, price, isActive }) => ({
					[name]: { price, isActive },
				}))
				.find(Boolean);

			const exclusivePrice = sortedArray
				.filter((item) => item.name === "exclusive")
				.map(({ name, price, isActive }) => ({
					[name]: { price, isActive },
				}))
				.find(Boolean);

			const pricingShort = {
				...basicPrice,
				...premiumPrice,
				...exclusivePrice,
			};

			const filteredArray = sortedArray.filter(
				(obj) => obj.isActive === true
			);

			return {
				// price return a [prices: [30, 350, 125], type_ids:['basic', exclusive', 'premium'], pricing_id:[three unique ids], product_id:[three ids (all the same)]}]

				// sortedArray returns array of objs. [{name: 'basic', price: 30}...] that is sorted by price.

				startingPrice: filteredArray[0],
				pricing: sortedArray,
				pricingShort: pricingShort,
				filteredPricing: filteredArray,
				free: free.free,
			};
		}

		return;
	} catch (error) {
		console.error("Unexpected error:", error.message);
		return []; // Return an empty array in case of an error
	}
}

