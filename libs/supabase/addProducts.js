"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import dayjs from "dayjs"

const supabase = createServerActionClient({ cookies })

export async function addProducts(formData) {
	console.log("submitting form on server")
	console.log("formData file:", formData.get("file"))

	// const {
	// 	data: { user },
	// } = await supabase.auth.getUser()

	// const userId = user.id

	// try {
	// 	const file = formData.file_MP3.file
	// 	const fileExt = file.name.split(".").pop()
	// 	const fileName = `${crypto.randomUUID()}.${fileExt}`
	// 	// console.log("File:", file)
	// 	// console.log("File Extension:", fileExt)
	// 	// console.log("File Name:", fileName)

	// 	const filePath = `user_uploads/${userId}/${fileName}`

	// 	const { error } = await supabase.storage
	// 		.from("files")
	// 		.upload(filePath, file)

	// 	if (error) {
	// 		throw error
	// 	}
	// } catch (err) {
	// 	console.error(err)
	// } finally {
	// }

	// try {
	// 	await supabase.from("products").insert({
	// 		image: formData.image,
	// 		title: formData.title,
	// 		type: formData.type,
	// 		release_date: formData.releaseDate,
	// 		release_date_long: dayjs(formData.releaseDate).format(
	// 			"MMMM D, YYYY "
	// 		),
	// 		description: formData.description,
	// 		tags: formData.tags.map((tag) => tag.name),
	// 		genres: formData.genres.map((tag) => tag.name),
	// 		moods: formData.moods.map((tag) => tag.name),
	// 		keys: formData.keys,
	// 		bpm: formData.bpm,
	// 		instruments: formData.instruments.map((tag) => tag.name),
	// 		price: formData.price,
	// 	})
	// } catch (error) {
	// 	console.log(error)
	// }
}
