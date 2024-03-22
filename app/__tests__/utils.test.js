import { expect, describe, it, beforeEach } from "vitest"
import { createFormData, returnArray, returnCommentAge } from "@/libs/utils"

import dayjs from "dayjs"

describe("#commentAge", () => {
	function convertTime(value, unit) {
		const now = dayjs()
		return dayjs(now)
			.subtract(value, unit)
			.format("YYYY-MM-DD HH:mm:ss.SSSSSSZ")
	}

	const times = {
		test1: {
			value: convertTime(15, "second"),
			expected: "15 seconds ago",
		},
		test2: {
			value: convertTime(1, "minute"),
			expected: "1 minute ago",
		},
		test3: {
			value: convertTime(1.5, "minute"),
			expected: "2 minutes ago",
		},
		test4: {
			value: convertTime(2, "minute"),
			expected: "2 minutes ago",
		},
		test5: {
			value: convertTime(1, "hour"),
			expected: "1 hour ago",
		},
		test6: {
			value: convertTime(2, "hour"),
			expected: "2 hours ago",
		},
		test7: {
			value: convertTime(2, "minute"),
			expected: "2 minutes ago",
		},
		test8: {
			value: convertTime(1, "day"),
			expected: "1 day ago",
		},
		test9: {
			value: convertTime(1.5, "week"),
			expected: "1 week ago",
		},
		test10: {
			value: convertTime(8, "week"),
			expected: "8 weeks ago",
		},
		test11: {
			value: convertTime(1, "year"),
			expected: "1 year ago",
		},
	}

	for (const key in times) {
		const { value, expected } = times[key]

		it(`returns ${expected} for ${key}`, () => {
			expect(returnCommentAge(value)).toBe(expected)
		})
	}
})

describe("return array", () => {
	const input = {
		genres: [
			{ name: "Balls", id: "1" },
			{ name: "Big Balls", id: "2" },
			{ name: "RAP", id: "3" },
			{ name: "alternative rock", id: "4" },
			{ name: "METAL", id: "5" },
			{ name: "peace", id: "6" },
			{ name: "r&b  ", id: "7" },
		],
	}

	const formData = createFormData(input)

	it("returns an array in proper case", () => {
		expect(returnArray("genres", formData)).toStrictEqual([
			"Balls",
			"Big Balls",
			"Rap",
			"Alternative Rock",
			"Metal",
			"Peace",
			"R&b",
		])
	})

	// it("returns an array in proper case", () => {
	// 	expect(createFormData("genres", formData)).toBe([
	// 		"Balls",
	// 		"Big Balls",
	// 		"R&B",
	// 		"HIP HOP",
	// 		"Balls Balls",
	// 	])
	// })
})

// describe("product data", async () => {
// 	const supabaseUrl = "https://njowjcfiaxbnflrcwcep.supabase.co"
// 	const supabaseKey =
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qb3dqY2ZpYXhibmZscmN3Y2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NTY1MjIsImV4cCI6MjAyMTUzMjUyMn0.8lqE9yiehnIJjfAug0Jwi-XHwrtEiashKBEHxaKt1i4"

// 	const supabaseClient = createClient(supabaseUrl, supabaseKey)

// 	const product_id = "1c6782b4-d34f-4659-bb53-bfd09020be10"
// 	let products
// 	beforeEach(async () => {
// 		// const { data } = await supabaseClient
// 		// 	.from("products")
// 		// 	.select()
// 		// products = data

// 		const { data, error } = await supabaseClient.rpc("get_product_data")

// 		products = data
// 	})

// 	// const data = [
// 	// 	{
// 	// 		pricing: [
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 30,
// 	// 				pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
// 	// 				type_id: "basic",
// 	// 			},
// 	// 			{
// 	// 				is_active: true,
// 	// 				price: 50,
// 	// 				pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
// 	// 				type_id: "premium",
// 	// 			},
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 250,
// 	// 				pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
// 	// 				type_id: "exclusive",
// 	// 			},
// 	// 		],
// 	// 		product_data: {
// 	// 			bpm: 107,
// 	// 			created_at: "2024-03-01T18:02:25.009279+00:00",
// 	// 			description: "definitely copyright but idc",
// 	// 			free: false,
// 	// 			genres: ["R&b", "Hip Hop", "Hype"],
// 	// 			instruments: ["Bass", "Drums", "Snare", "Synth"],
// 	// 			keys: "CM",
// 	// 			likes: 0,
// 	// 			moods: ["Chill", "Lit"],
// 	// 			product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
// 	// 			release_date: "2024-03-01",
// 	// 			release_date_long: "March 1, 2024 ",
// 	// 			tags: ["Drake", "Party", "Hype"],
// 	// 			title: "Nonstop",
// 	// 			type: "Melody",
// 	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
// 	// 			video_link: "https://www.youtube.com/watch?v=QVqS3tB8OtE",
// 	// 		},
// 	// 		product_files: [
// 	// 			{
// 	// 				file_extension: ".mp3",
// 	// 				file_url:
// 	// 					"fa6255df-90cd-4ba2-b6b5-708c86dffa39/e004ee31-3994-4c47-a66f-c9c676cbd195",
// 	// 				pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
// 	// 				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".wav",
// 	// 				file_url:
// 	// 					"fa6255df-90cd-4ba2-b6b5-708c86dffa39/80ca3885-012c-4bb9-9cd2-257d7094831d",
// 	// 				pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
// 	// 				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".zip",
// 	// 				file_url:
// 	// 					"fa6255df-90cd-4ba2-b6b5-708c86dffa39/f64617fc-c34f-45db-8f39-e7a022c27c75",
// 	// 				pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
// 	// 				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
// 	// 			},
// 	// 		],
// 	// 		product_likes: [
// 	// 			{
// 	// 				liked_by_email: [
// 	// 					"cokingtins1@outlook.com",
// 	// 					"flexdrpeppa1212@gmail.com",
// 	// 					"flexdrpeppa1212@gmail.com",
// 	// 				],
// 	// 				liked_by_id: [
// 	// 					"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
// 	// 					"9907242e-8d03-4128-855f-627a6aa47f80",
// 	// 					"83466edf-f34a-4f84-82fe-b507d1229954",
// 	// 				],
// 	// 				likes: 4,
// 	// 				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
// 	// 			},
// 	// 		],
// 	// 	},
// 	// 	{
// 	// 		pricing: [
// 	// 			{
// 	// 				is_active: true,
// 	// 				price: 30,
// 	// 				pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
// 	// 				type_id: "basic",
// 	// 			},
// 	// 			{
// 	// 				is_active: true,
// 	// 				price: 50,
// 	// 				pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
// 	// 				type_id: "premium",
// 	// 			},
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 250,
// 	// 				pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
// 	// 				type_id: "exclusive",
// 	// 			},
// 	// 		],
// 	// 		product_data: {
// 	// 			bpm: 133,
// 	// 			created_at: "2024-03-09T01:56:36.772184+00:00",
// 	// 			description: "Drake type beat.",
// 	// 			free: true,
// 	// 			genres: ["Hip Hop"],
// 	// 			instruments: ["Synth", "Drums", "Vocals"],
// 	// 			keys: "None",
// 	// 			likes: 0,
// 	// 			moods: ["Happy"],
// 	// 			product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
// 	// 			release_date: "2024-03-09",
// 	// 			release_date_long: "March 8, 2024 ",
// 	// 			tags: ["Drake Type Beat", "Drake"],
// 	// 			title: "Alright",
// 	// 			type: "Beat",
// 	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
// 	// 			video_link: "",
// 	// 		},
// 	// 		product_files: [
// 	// 			{
// 	// 				file_extension: ".mp3",
// 	// 				file_url:
// 	// 					"6499532d-6983-45d7-a90e-4a9c2a787381/e3a2321e-5bc4-4719-8fca-f14838c83f93",
// 	// 				pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
// 	// 				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".wav",
// 	// 				file_url:
// 	// 					"6499532d-6983-45d7-a90e-4a9c2a787381/13bec3a9-5fe2-4052-b503-61b845cad01d",
// 	// 				pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
// 	// 				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".zip",
// 	// 				file_url:
// 	// 					"6499532d-6983-45d7-a90e-4a9c2a787381/1a277bba-ff39-40f9-850c-0eecf780f84a",
// 	// 				pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
// 	// 				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
// 	// 			},
// 	// 		],
// 	// 		product_likes: [
// 	// 			{
// 	// 				liked_by_email: ["seancokingtin@gmail.com"],
// 	// 				liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
// 	// 				likes: 1,
// 	// 				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
// 	// 			},
// 	// 		],
// 	// 	},
// 	// 	{
// 	// 		pricing: [
// 	// 			{
// 	// 				is_active: true,
// 	// 				price: 25,
// 	// 				pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
// 	// 				type_id: "basic",
// 	// 			},
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 50,
// 	// 				pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
// 	// 				type_id: "premium",
// 	// 			},
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 250,
// 	// 				pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
// 	// 				type_id: "exclusive",
// 	// 			},
// 	// 		],
// 	// 		product_data: {
// 	// 			bpm: 55,
// 	// 			created_at: "2024-03-11T12:29:07.552975+00:00",
// 	// 			description: "test beat",
// 	// 			free: false,
// 	// 			genres: ["Hip Hop", "Rap", "Trap"],
// 	// 			instruments: ["Drums", "Bass"],
// 	// 			keys: "None",
// 	// 			likes: 0,
// 	// 			moods: ["Hype", "Chill", "Cool"],
// 	// 			product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
// 	// 			release_date: "2024-03-11",
// 	// 			release_date_long: "March 11, 2024 ",
// 	// 			tags: ["Drake", "Drake Type Beat"],
// 	// 			title: "Test Upload",
// 	// 			type: "Melody",
// 	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
// 	// 			video_link: "",
// 	// 		},
// 	// 		product_files: [
// 	// 			{
// 	// 				file_extension: ".mp3",
// 	// 				file_url:
// 	// 					"1c6782b4-d34f-4659-bb53-bfd09020be10/a7a759dd-18e6-435a-b137-2db5f97a3dc5",
// 	// 				pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
// 	// 				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".wav",
// 	// 				file_url:
// 	// 					"1c6782b4-d34f-4659-bb53-bfd09020be10/5c86330e-50ba-45aa-9376-986184386c27",
// 	// 				pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
// 	// 				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".zip",
// 	// 				file_url:
// 	// 					"1c6782b4-d34f-4659-bb53-bfd09020be10/97848498-1c66-477a-8a4f-e38160b175b9",
// 	// 				pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
// 	// 				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
// 	// 			},
// 	// 		],
// 	// 		product_likes: [
// 	// 			{
// 	// 				liked_by_email: ["seancokingtin@gmail.com"],
// 	// 				liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
// 	// 				likes: 1,
// 	// 				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
// 	// 			},
// 	// 		],
// 	// 	},
// 	// 	{
// 	// 		pricing: [
// 	// 			{
// 	// 				is_active: true,
// 	// 				price: 30,
// 	// 				pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
// 	// 				type_id: "basic",
// 	// 			},
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 50,
// 	// 				pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
// 	// 				type_id: "premium",
// 	// 			},
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 250,
// 	// 				pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
// 	// 				type_id: "exclusive",
// 	// 			},
// 	// 		],
// 	// 		product_data: {
// 	// 			bpm: 111,
// 	// 			created_at: "2024-03-11T13:01:40.817381+00:00",
// 	// 			description: "test",
// 	// 			free: false,
// 	// 			genres: ["Hyphy", "West Coast"],
// 	// 			instruments: ["Synth", "Drums"],
// 	// 			keys: "None",
// 	// 			likes: 0,
// 	// 			moods: ["Chill", "Cool"],
// 	// 			product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
// 	// 			release_date: "2024-03-11",
// 	// 			release_date_long: "March 11, 2024 ",
// 	// 			tags: ["Hyphy", "Lit", "Sick"],
// 	// 			title: "Alright Test 2",
// 	// 			type: "Drum Kit",
// 	// 			user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
// 	// 			video_link: "",
// 	// 		},
// 	// 		product_files: [
// 	// 			{
// 	// 				file_extension: ".mp3",
// 	// 				file_url:
// 	// 					"051cd3d3-bad5-483c-9696-6b5782d0a3c5/6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
// 	// 				pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
// 	// 				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".wav",
// 	// 				file_url:
// 	// 					"051cd3d3-bad5-483c-9696-6b5782d0a3c5/89c88ac6-8174-4250-923a-132d6cb3383f",
// 	// 				pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
// 	// 				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".zip",
// 	// 				file_url:
// 	// 					"051cd3d3-bad5-483c-9696-6b5782d0a3c5/cb79a528-83df-4400-b989-10d551f8e88e",
// 	// 				pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
// 	// 				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
// 	// 			},
// 	// 		],
// 	// 		product_likes: [
// 	// 			{
// 	// 				liked_by_email: [],
// 	// 				liked_by_id: [],
// 	// 				likes: 0,
// 	// 				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
// 	// 			},
// 	// 		],
// 	// 	},
// 	// 	{
// 	// 		pricing: [
// 	// 			{
// 	// 				is_active: true,
// 	// 				price: 30,
// 	// 				pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
// 	// 				type_id: "basic",
// 	// 			},
// 	// 			{
// 	// 				is_active: true,
// 	// 				price: 50,
// 	// 				pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
// 	// 				type_id: "premium",
// 	// 			},
// 	// 			{
// 	// 				is_active: false,
// 	// 				price: 250,
// 	// 				pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
// 	// 				type_id: "exclusive",
// 	// 			},
// 	// 		],
// 	// 		product_data: {
// 	// 			bpm: 55,
// 	// 			created_at: "2024-03-05T16:04:42.558622+00:00",
// 	// 			description: "cool beat",
// 	// 			free: true,
// 	// 			genres: ["Rap", "Trap"],
// 	// 			instruments: ["Bass", "Drums"],
// 	// 			keys: "None",
// 	// 			likes: 0,
// 	// 			moods: ["Chill", "Hype"],
// 	// 			product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
// 	// 			release_date: "2024-03-05",
// 	// 			release_date_long: "March 5, 2024 ",
// 	// 			tags: ["Drake", "Drake Type Beat"],
// 	// 			title: "Avec Toi 91 BPM - @1trav x Trevbaj (Drake)_Master",
// 	// 			type: "Drum Kit",
// 	// 			user_id: "292e2950-49b1-4637-9697-83d33751e6f4",
// 	// 			video_link: "",
// 	// 		},
// 	// 		product_files: [
// 	// 			{
// 	// 				file_extension: ".mp3",
// 	// 				file_url:
// 	// 					"f28d8314-532e-42a7-b697-23d53135a86b/8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
// 	// 				pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
// 	// 				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".wav",
// 	// 				file_url:
// 	// 					"f28d8314-532e-42a7-b697-23d53135a86b/9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
// 	// 				pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
// 	// 				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
// 	// 			},
// 	// 			{
// 	// 				file_extension: ".zip",
// 	// 				file_url:
// 	// 					"f28d8314-532e-42a7-b697-23d53135a86b/059f7ec7-b93c-4425-b6a2-34ef77e20989",
// 	// 				pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
// 	// 				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
// 	// 			},
// 	// 		],
// 	// 		product_likes: [
// 	// 			{
// 	// 				liked_by_email: [
// 	// 					"cokingtins1@outlook.com",
// 	// 					"flexdrpeppa1212@gmail.com",
// 	// 					"flexdrpeppa1212@gmail.com",
// 	// 					"flexdrpeppa1212@gmail.com",
// 	// 					"flexdrpeppa1212@gmail.com",
// 	// 					"seancokingtin@gmail.com",
// 	// 				],
// 	// 				liked_by_id: [
// 	// 					"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
// 	// 					"d475aef3-69c9-45a8-aa90-f701b916180b",
// 	// 					"9907242e-8d03-4128-855f-627a6aa47f80",
// 	// 					"a164f8d0-eb80-4ade-a685-668510281cfc",
// 	// 					"83466edf-f34a-4f84-82fe-b507d1229954",
// 	// 					"26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
// 	// 				],
// 	// 				likes: 9,
// 	// 				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
// 	// 			},
// 	// 		],
// 	// 	},
// 	// ]

// 	// const productData = data.map((item) => item.product_data)

// 	// const productPrices = data.map((item) => item.pricing)

// 	// // change the data to add startingPrice prop:
// 	// for (const item of data) {
// 	// 	const activePrices = item.pricing.filter((price) => price.is_active)
// 	// 	const minPrice = Math.min(...activePrices.map((price) => price.price))
// 	// 	item.startingPrice = minPrice

// 	// 	item.productId = item.product_data.product_id
// 	// 	const isFree = item.product_data.free
// 	// 	item.isFree = isFree

// 	// 	const productLikes = item.product_likes[0].likes
// 	// 	item.productLikes = productLikes

// 	// 	// item.imageSrc = getImageSrc(item.product_data.product_id)
// 	// 	// const {storeSrc} = getFileSources(item.product_data.product_id)
// 	// 	// item.storeSrc = storeSrc
// 	// 	// const {storeSrcType} = getFileSources(item.product_data.product_id)
// 	// 	// item.storeSrcType = storeSrcType
// 	// }

// 	// const productIds = data.map((item) => item.product_data.product_id)

// 	// it("returns all the data.length", () => {
// 	// 	expect(productData.length).toBe(5)
// 	// })

// 	// it("returns all product data", () => {
// 	// 	expect(data[0].isFree).toBe(false)
// 	// })

// 	// it("returns checks if item is free", () => {
// 	// 	expect(data[0].productLikes).toBe(4)
// 	// })

// 	// it("returns checks if item is free", () => {
// 	// 	expect(products).toBe(3
// 	// 		)
// 	// })
// })

describe("#filters", () => {
	const data = [
		{
			pricing: [
				{
					is_active: true,
					price: 30,
					pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
					type_id: "basic",
				},
				{
					is_active: false,
					price: 50,
					pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
					type_id: "premium",
				},
				{
					is_active: false,
					price: 250,
					pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
					type_id: "exclusive",
				},
			],
			product_data: {
				bpm: 107,
				created_at: "2024-03-01T18:02:25.009279+00:00",
				description: "definitely copyright but idc",
				free: true,
				genres: ["R&b", "Hip Hop", "Hype"],
				instruments: ["Bass", "Drums", "Snare", "Synth"],
				keys: "CM",
				likes: 0,
				moods: ["Chill", "Lit"],
				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
				release_date: "2024-03-01",
				release_date_long: "March 1, 2024 ",
				tags: ["Drake", "Party", "Hype"],
				title: "Nonstop",
				type: "Melody",
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				video_link: "https://www.youtube.com/watch?v=QVqS3tB8OtE",
			},
			product_files: [
				{
					file_extension: ".mp3",
					file_url:
						"fa6255df-90cd-4ba2-b6b5-708c86dffa39/e004ee31-3994-4c47-a66f-c9c676cbd195",
					pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
					product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
				},
				{
					file_extension: ".wav",
					file_url:
						"fa6255df-90cd-4ba2-b6b5-708c86dffa39/80ca3885-012c-4bb9-9cd2-257d7094831d",
					pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
					product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
				},
				{
					file_extension: ".zip",
					file_url:
						"fa6255df-90cd-4ba2-b6b5-708c86dffa39/f64617fc-c34f-45db-8f39-e7a022c27c75",
					pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
					product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
				},
			],
			product_likes: {
				liked_by_email: [
					"cokingtins1@outlook.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
				],
				liked_by_id: [
					"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
					"9907242e-8d03-4128-855f-627a6aa47f80",
					"83466edf-f34a-4f84-82fe-b507d1229954",
				],
				likes: 4,
				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
			},
		},
		{
			pricing: [
				{
					is_active: true,
					price: 30,
					pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
					type_id: "basic",
				},
				{
					is_active: true,
					price: 50,
					pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
					type_id: "premium",
				},
				{
					is_active: false,
					price: 250,
					pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
					type_id: "exclusive",
				},
			],
			product_data: {
				bpm: 133,
				created_at: "2024-03-09T01:56:36.772184+00:00",
				description: "Drake type beat.",
				free: true,
				genres: ["Hip Hop"],
				instruments: ["Synth", "Drums", "Vocals"],
				keys: "None",
				likes: 0,
				moods: ["Happy"],
				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
				release_date: "2024-03-09",
				release_date_long: "March 8, 2024 ",
				tags: ["Drake Type Beat", "Drake"],
				title: "Alright",
				type: "Beat",
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				video_link: "",
			},
			product_files: [
				{
					file_extension: ".mp3",
					file_url:
						"6499532d-6983-45d7-a90e-4a9c2a787381/e3a2321e-5bc4-4719-8fca-f14838c83f93",
					pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
					product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
				},
				{
					file_extension: ".wav",
					file_url:
						"6499532d-6983-45d7-a90e-4a9c2a787381/13bec3a9-5fe2-4052-b503-61b845cad01d",
					pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
					product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
				},
				{
					file_extension: ".zip",
					file_url:
						"6499532d-6983-45d7-a90e-4a9c2a787381/1a277bba-ff39-40f9-850c-0eecf780f84a",
					pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
					product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
				},
			],
			product_likes: {
				liked_by_email: ["seancokingtin@gmail.com"],
				liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
				likes: 1,
				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
			},
		},
		{
			pricing: [
				{
					is_active: true,
					price: 25,
					pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
					type_id: "basic",
				},
				{
					is_active: false,
					price: 50,
					pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
					type_id: "premium",
				},
				{
					is_active: false,
					price: 250,
					pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
					type_id: "exclusive",
				},
			],
			product_data: {
				bpm: 55,
				created_at: "2024-03-11T12:29:07.552975+00:00",
				description: "test beat",
				free: false,
				genres: ["Hip Hop", "Rap", "Trap"],
				instruments: ["Drums", "Bass"],
				keys: "None",
				likes: 0,
				moods: ["Hype", "Chill", "Cool"],
				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
				release_date: "2024-03-11",
				release_date_long: "March 11, 2024 ",
				tags: ["Drake", "Drake Type Beat"],
				title: "Test Upload",
				type: "Melody",
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				video_link: "",
			},
			product_files: [
				{
					file_extension: ".mp3",
					file_url:
						"1c6782b4-d34f-4659-bb53-bfd09020be10/a7a759dd-18e6-435a-b137-2db5f97a3dc5",
					pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
					product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
				},
				{
					file_extension: ".wav",
					file_url:
						"1c6782b4-d34f-4659-bb53-bfd09020be10/5c86330e-50ba-45aa-9376-986184386c27",
					pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
					product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
				},
				{
					file_extension: ".zip",
					file_url:
						"1c6782b4-d34f-4659-bb53-bfd09020be10/97848498-1c66-477a-8a4f-e38160b175b9",
					pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
					product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
				},
			],
			product_likes: {
				liked_by_email: ["seancokingtin@gmail.com"],
				liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
				likes: 1,
				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
			},
		},
		{
			pricing: [
				{
					is_active: true,
					price: 30,
					pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
					type_id: "basic",
				},
				{
					is_active: false,
					price: 50,
					pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
					type_id: "premium",
				},
				{
					is_active: false,
					price: 250,
					pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
					type_id: "exclusive",
				},
			],
			product_data: {
				bpm: 111,
				created_at: "2024-03-11T13:01:40.817381+00:00",
				description: "test",
				free: false,
				genres: ["Hyphy", "West Coast"],
				instruments: ["Synth", "Drums"],
				keys: "None",
				likes: 0,
				moods: ["Chill", "Cool"],
				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
				release_date: "2024-03-11",
				release_date_long: "March 11, 2024 ",
				tags: ["Hyphy", "Lit", "Sick"],
				title: "Alright Test 2",
				type: "Drum Kit",
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				video_link: "",
			},
			product_files: [
				{
					file_extension: ".mp3",
					file_url:
						"051cd3d3-bad5-483c-9696-6b5782d0a3c5/6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
					pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
					product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
				},
				{
					file_extension: ".wav",
					file_url:
						"051cd3d3-bad5-483c-9696-6b5782d0a3c5/89c88ac6-8174-4250-923a-132d6cb3383f",
					pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
					product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
				},
				{
					file_extension: ".zip",
					file_url:
						"051cd3d3-bad5-483c-9696-6b5782d0a3c5/cb79a528-83df-4400-b989-10d551f8e88e",
					pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
					product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
				},
			],
			product_likes: {
				liked_by_email: [],
				liked_by_id: [],
				likes: 0,
				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
			},
		},
		{
			pricing: [
				{
					is_active: true,
					price: 30,
					pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
					type_id: "basic",
				},
				{
					is_active: true,
					price: 50,
					pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
					type_id: "premium",
				},
				{
					is_active: false,
					price: 250,
					pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
					type_id: "exclusive",
				},
			],
			product_data: {
				bpm: 55,
				created_at: "2024-03-05T16:04:42.558622+00:00",
				description: "cool beat",
				free: true,
				genres: ["Rap", "Trap"],
				instruments: ["Bass", "Drums"],
				keys: "None",
				likes: 0,
				moods: ["Chill", "Hype"],
				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
				release_date: "2024-03-05",
				release_date_long: "March 5, 2024 ",
				tags: ["Drake", "Drake Type Beat"],
				title: "Avec Toi 91 BPM - @1trav x Trevbaj (Drake)_Master",
				type: "Drum Kit",
				user_id: "292e2950-49b1-4637-9697-83d33751e6f4",
				video_link: "",
			},
			product_files: [
				{
					file_extension: ".mp3",
					file_url:
						"f28d8314-532e-42a7-b697-23d53135a86b/8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
					pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
					product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
				},
				{
					file_extension: ".wav",
					file_url:
						"f28d8314-532e-42a7-b697-23d53135a86b/9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
					pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
					product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
				},
				{
					file_extension: ".zip",
					file_url:
						"f28d8314-532e-42a7-b697-23d53135a86b/059f7ec7-b93c-4425-b6a2-34ef77e20989",
					pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
					product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
				},
			],
			product_likes: {
				liked_by_email: [
					"cokingtins1@outlook.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
					"seancokingtin@gmail.com",
				],
				liked_by_id: [
					"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
					"d475aef3-69c9-45a8-aa90-f701b916180b",
					"9907242e-8d03-4128-855f-627a6aa47f80",
					"a164f8d0-eb80-4ade-a685-668510281cfc",
					"83466edf-f34a-4f84-82fe-b507d1229954",
					"26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				],
				likes: 9,
				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
			},
		},
	]

	const testCases = [
		// {
		// 	searchParams: {},
		// 	expectedFilteredData: data,
		// },
		{
			searchParams: { moods: "Chill", genres: "Hip Hop" },
			expectedFilteredData: data[0],
		},
	]

	function filterData(data, searchParams) {
		const filteredProducts = data.filter((product) =>
			Object.entries(searchParams).every(([key, value]) => {
				if (key === "bpm") {
					const [minBpm, maxBpm] = value.split(",").map(Number)
					return (
						product.product_data[key] >= minBpm &&
						product.product_data[key] <= maxBpm
					)
				} else if (key === "tags") {
					const tags = value.split(",").map((tag) => tag.trim())
					return tags.every((tag) =>
						product.product_data[key].includes(tag)
					)
				} else {
					return (
						product.product_data[key] &&
						product.product_data[key].includes(value)
					)
				}
			})
		)
		return filteredProducts
	}

	// Iterate over each test case
	testCases.forEach(({ searchParams, expectedFilteredData }) => {
		let filteredData

		beforeEach(() => {
			// Call the filterData function with the current test case's searchParams
			filteredData = filterData(data, searchParams)
		})

		it("filters data with search parameters", () => {
			filteredData.forEach((product) => {
				Object.entries(searchParams).forEach(([key, value]) => {
					expect(product.product_data[key]).toContain(value)
				})
			})
		})
		it("returns filtered genres", () => {
			function returnFilters(array, filter) {
				return Array.from(
					new Set(
						array.flatMap((product) => product.product_data[filter])
					)
				)
			}

			const filteredGenres = returnFilters(filteredData, "genres")

			// Assuming expectedFilteredData contains the expected number of unique genres
			expect(filteredGenres).toBe(expectedFilteredData.length)
		})
	})
})
