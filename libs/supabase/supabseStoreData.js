"use server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { useSession } from "./useSession"
import {
	getAudioSrcById,
	getImageSrc,
	getLikedByUser,
	getPricingById,
} from "./supabaseQuery"

export const createServerClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient({ cookies: () => cookieStore })
})

async function getAllProductData() {
	const { data, error } = await supabaseClient.rpc("get_product_data")
	return data
}

// Need: {startingPrice, free} , imageSrc, {storeSrc, storeSrcType}, likes, session, likedByUser

export async function constructData() {
	const data = await getAllProductData()
	const { session } = await useSession()

	const { pricing } = await getPricingById(
		"fa6255df-90cd-4ba2-b6b5-708c86dffa39"
	)

	// console.log(pricing)
	const userId = session?.user.id

	// const data = [
	// 	{
	// 		pricing: [
	// 			{
	// 				is_active: true,
	// 				price: 30,
	// 				pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
	// 				type_id: "basic",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 50,
	// 				pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
	// 				type_id: "premium",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 250,
	// 				pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
	// 				type_id: "exclusive",
	// 			},
	// 		],
	// 		product_data: {
	// 			bpm: 107,
	// 			created_at: "2024-03-01T18:02:25.009279+00:00",
	// 			description: "definitely copyright but idc",
	// 			free: true,
	// 			genres: ["R&b", "Hip Hop", "Hype"],
	// 			instruments: ["Bass", "Drums", "Snare", "Synth"],
	// 			keys: "CM",
	// 			likes: 0,
	// 			moods: ["Chill", "Lit"],
	// 			product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
	// 			release_date: "2024-03-01",
	// 			release_date_long: "March 1, 2024 ",
	// 			tags: ["Drake", "Party", "Hype"],
	// 			title: "Nonstop",
	// 			type: "Melody",
	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
	// 			video_link: "https://www.youtube.com/watch?v=QVqS3tB8OtE",
	// 		},
	// 		product_files: [
	// 			{
	// 				file_extension: ".mp3",
	// 				file_url:
	// 					"fa6255df-90cd-4ba2-b6b5-708c86dffa39/e004ee31-3994-4c47-a66f-c9c676cbd195",
	// 				pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
	// 				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
	// 			},
	// 			{
	// 				file_extension: ".wav",
	// 				file_url:
	// 					"fa6255df-90cd-4ba2-b6b5-708c86dffa39/80ca3885-012c-4bb9-9cd2-257d7094831d",
	// 				pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
	// 				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
	// 			},
	// 			{
	// 				file_extension: ".zip",
	// 				file_url:
	// 					"fa6255df-90cd-4ba2-b6b5-708c86dffa39/f64617fc-c34f-45db-8f39-e7a022c27c75",
	// 				pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
	// 				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
	// 			},
	// 		],
	// 		product_likes: {
	// 			liked_by_email: [
	// 				"cokingtins1@outlook.com",
	// 				"flexdrpeppa1212@gmail.com",
	// 				"flexdrpeppa1212@gmail.com",
	// 			],
	// 			liked_by_id: [
	// 				"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
	// 				"9907242e-8d03-4128-855f-627a6aa47f80",
	// 				"83466edf-f34a-4f84-82fe-b507d1229954",
	// 			],
	// 			likes: 4,
	// 			product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
	// 		},
	// 	},
	// 	{
	// 		pricing: [
	// 			{
	// 				is_active: true,
	// 				price: 30,
	// 				pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
	// 				type_id: "basic",
	// 			},
	// 			{
	// 				is_active: true,
	// 				price: 50,
	// 				pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
	// 				type_id: "premium",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 250,
	// 				pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
	// 				type_id: "exclusive",
	// 			},
	// 		],
	// 		product_data: {
	// 			bpm: 133,
	// 			created_at: "2024-03-09T01:56:36.772184+00:00",
	// 			description: "Drake type beat.",
	// 			free: true,
	// 			genres: ["Hip Hop"],
	// 			instruments: ["Synth", "Drums", "Vocals"],
	// 			keys: "None",
	// 			likes: 0,
	// 			moods: ["Happy"],
	// 			product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
	// 			release_date: "2024-03-09",
	// 			release_date_long: "March 8, 2024 ",
	// 			tags: ["Drake Type Beat", "Drake"],
	// 			title: "Alright",
	// 			type: "Beat",
	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
	// 			video_link: "",
	// 		},
	// 		product_files: [
	// 			{
	// 				file_extension: ".mp3",
	// 				file_url:
	// 					"6499532d-6983-45d7-a90e-4a9c2a787381/e3a2321e-5bc4-4719-8fca-f14838c83f93",
	// 				pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
	// 				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
	// 			},
	// 			{
	// 				file_extension: ".wav",
	// 				file_url:
	// 					"6499532d-6983-45d7-a90e-4a9c2a787381/13bec3a9-5fe2-4052-b503-61b845cad01d",
	// 				pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
	// 				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
	// 			},
	// 			{
	// 				file_extension: ".zip",
	// 				file_url:
	// 					"6499532d-6983-45d7-a90e-4a9c2a787381/1a277bba-ff39-40f9-850c-0eecf780f84a",
	// 				pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
	// 				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
	// 			},
	// 		],
	// 		product_likes: {
	// 			liked_by_email: ["seancokingtin@gmail.com"],
	// 			liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
	// 			likes: 1,
	// 			product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
	// 		},
	// 	},
	// 	{
	// 		pricing: [
	// 			{
	// 				is_active: true,
	// 				price: 25,
	// 				pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
	// 				type_id: "basic",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 50,
	// 				pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
	// 				type_id: "premium",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 250,
	// 				pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
	// 				type_id: "exclusive",
	// 			},
	// 		],
	// 		product_data: {
	// 			bpm: 55,
	// 			created_at: "2024-03-11T12:29:07.552975+00:00",
	// 			description: "test beat",
	// 			free: false,
	// 			genres: ["Hip Hop", "Rap", "Trap"],
	// 			instruments: ["Drums", "Bass"],
	// 			keys: "None",
	// 			likes: 0,
	// 			moods: ["Hype", "Chill", "Cool"],
	// 			product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
	// 			release_date: "2024-03-11",
	// 			release_date_long: "March 11, 2024 ",
	// 			tags: ["Drake", "Drake Type Beat"],
	// 			title: "Test Upload",
	// 			type: "Melody",
	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
	// 			video_link: "",
	// 		},
	// 		product_files: [
	// 			{
	// 				file_extension: ".mp3",
	// 				file_url:
	// 					"1c6782b4-d34f-4659-bb53-bfd09020be10/a7a759dd-18e6-435a-b137-2db5f97a3dc5",
	// 				pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
	// 				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
	// 			},
	// 			{
	// 				file_extension: ".wav",
	// 				file_url:
	// 					"1c6782b4-d34f-4659-bb53-bfd09020be10/5c86330e-50ba-45aa-9376-986184386c27",
	// 				pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
	// 				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
	// 			},
	// 			{
	// 				file_extension: ".zip",
	// 				file_url:
	// 					"1c6782b4-d34f-4659-bb53-bfd09020be10/97848498-1c66-477a-8a4f-e38160b175b9",
	// 				pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
	// 				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
	// 			},
	// 		],
	// 		product_likes: {
	// 			liked_by_email: ["seancokingtin@gmail.com"],
	// 			liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
	// 			likes: 1,
	// 			product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
	// 		},
	// 	},
	// 	{
	// 		pricing: [
	// 			{
	// 				is_active: true,
	// 				price: 30,
	// 				pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
	// 				type_id: "basic",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 50,
	// 				pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
	// 				type_id: "premium",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 250,
	// 				pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
	// 				type_id: "exclusive",
	// 			},
	// 		],
	// 		product_data: {
	// 			bpm: 111,
	// 			created_at: "2024-03-11T13:01:40.817381+00:00",
	// 			description: "test",
	// 			free: false,
	// 			genres: ["Hyphy", "West Coast"],
	// 			instruments: ["Synth", "Drums"],
	// 			keys: "None",
	// 			likes: 0,
	// 			moods: ["Chill", "Cool"],
	// 			product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
	// 			release_date: "2024-03-11",
	// 			release_date_long: "March 11, 2024 ",
	// 			tags: ["Hyphy", "Lit", "Sick"],
	// 			title: "Alright Test 2",
	// 			type: "Drum Kit",
	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
	// 			video_link: "",
	// 		},
	// 		product_files: [
	// 			{
	// 				file_extension: ".mp3",
	// 				file_url:
	// 					"051cd3d3-bad5-483c-9696-6b5782d0a3c5/6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
	// 				pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
	// 				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
	// 			},
	// 			{
	// 				file_extension: ".wav",
	// 				file_url:
	// 					"051cd3d3-bad5-483c-9696-6b5782d0a3c5/89c88ac6-8174-4250-923a-132d6cb3383f",
	// 				pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
	// 				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
	// 			},
	// 			{
	// 				file_extension: ".zip",
	// 				file_url:
	// 					"051cd3d3-bad5-483c-9696-6b5782d0a3c5/cb79a528-83df-4400-b989-10d551f8e88e",
	// 				pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
	// 				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
	// 			},
	// 		],
	// 		product_likes: {
	// 			liked_by_email: [],
	// 			liked_by_id: [],
	// 			likes: 0,
	// 			product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
	// 		},
	// 	},
	// 	{
	// 		pricing: [
	// 			{
	// 				is_active: true,
	// 				price: 30,
	// 				pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
	// 				type_id: "basic",
	// 			},
	// 			{
	// 				is_active: true,
	// 				price: 50,
	// 				pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
	// 				type_id: "premium",
	// 			},
	// 			{
	// 				is_active: false,
	// 				price: 250,
	// 				pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
	// 				type_id: "exclusive",
	// 			},
	// 		],
	// 		product_data: {
	// 			bpm: 55,
	// 			created_at: "2024-03-05T16:04:42.558622+00:00",
	// 			description: "cool beat",
	// 			free: true,
	// 			genres: ["Rap", "Trap"],
	// 			instruments: ["Bass", "Drums"],
	// 			keys: "None",
	// 			likes: 0,
	// 			moods: ["Chill", "Hype"],
	// 			product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
	// 			release_date: "2024-03-05",
	// 			release_date_long: "March 5, 2024 ",
	// 			tags: ["Drake", "Drake Type Beat"],
	// 			title: "Avec Toi 91 BPM - @1trav x Trevbaj (Drake)_Master",
	// 			type: "Drum Kit",
	// 			user_id: "292e2950-49b1-4637-9697-83d33751e6f4",
	// 			video_link: "",
	// 		},
	// 		product_files: [
	// 			{
	// 				file_extension: ".mp3",
	// 				file_url:
	// 					"f28d8314-532e-42a7-b697-23d53135a86b/8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
	// 				pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
	// 				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
	// 			},
	// 			{
	// 				file_extension: ".wav",
	// 				file_url:
	// 					"f28d8314-532e-42a7-b697-23d53135a86b/9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
	// 				pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
	// 				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
	// 			},
	// 			{
	// 				file_extension: ".zip",
	// 				file_url:
	// 					"f28d8314-532e-42a7-b697-23d53135a86b/059f7ec7-b93c-4425-b6a2-34ef77e20989",
	// 				pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
	// 				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
	// 			},
	// 		],
	// 		product_likes: {
	// 			liked_by_email: [
	// 				"cokingtins1@outlook.com",
	// 				"flexdrpeppa1212@gmail.com",
	// 				"flexdrpeppa1212@gmail.com",
	// 				"flexdrpeppa1212@gmail.com",
	// 				"flexdrpeppa1212@gmail.com",
	// 				"seancokingtin@gmail.com",
	// 			],
	// 			liked_by_id: [
	// 				"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
	// 				"d475aef3-69c9-45a8-aa90-f701b916180b",
	// 				"9907242e-8d03-4128-855f-627a6aa47f80",
	// 				"a164f8d0-eb80-4ade-a685-668510281cfc",
	// 				"83466edf-f34a-4f84-82fe-b507d1229954",
	// 				"26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
	// 			],
	// 			likes: 9,
	// 			product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
	// 		},
	// 	},
	// ]
	const productData = data.map((item) => item.product_data)
	const productPrices = data.map((item) => item.pricing)
	const productIds = data.map((item) => item.product_data.product_id)

	//need filteredArray

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
		const pricing_id = activePrices.map((price) => price.pricing_id)
		item.startingPrice = lowestPrice
			? Object.fromEntries(Object.entries(lowestPrice))
			: null

		item.sortedPricing = await getPricingById(item.product_data.product_id)

		const isFree = item.product_data.free
		item.isFree = isFree

		const productLikes = item.product_likes.likes
		item.productLikes = productLikes

		item.imageSrc = await getImageSrc(item.product_data.product_id)
		const { storeSrc, storeSrcType } = await getAudioSrcById(
			item.product_data.product_id
		)
		item.storeSrc = storeSrc
		item.storeSrcType = storeSrcType

		if (session) {
			const likedByUser = await getLikedByUser(
				userId,
				item.product_data.product_id
			)
			item.session = session
			item.likedByUser = likedByUser ? likedByUser : false
		} else {
			item.likedByUser = false
			item.session = null
		}
	}

	return data
}

// const data = {
// 	startingPrice: "", //check => data[0].startingPrice = 30
// 	free: "", // check => data[0].isFree = true
// 	imageSrc: "", // check data[0].imageSrc = "xyz..."
// 	storeSrc: "", // check data[0].storeSrc = "xyz..."
// 	storeSrcType: "", // check => data[0].storeSrcType = "xyz..."
// 	likes: "", // check => data[0].productLikes = 4
// 	likedByUser: "",

// 	session: "",
// }
