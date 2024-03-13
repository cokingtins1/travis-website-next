"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import dayjs from "dayjs"

const supabase = createServerActionClient({ cookies })

export async function processForm(dataObject) {
	const formData = new FormData()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const userId = user.id
	const uploadID = crypto.randomUUID()

	for (const key in dataObject) {
		if (dataObject.hasOwnProperty(key)) {
			const value = dataObject[key]

			if (value instanceof File) {
				// Handle File type (e.g., upload to server)
				await uploadFile(userId, uploadID, value)
			} else {
				// Handle other data types (string, boolean, integer, etc.)
				formData.append(key, value)
			}
		}
	}
	await uploadData(formData, uploadID)
}

// async function processSingleFile(file) {
// 	// Your logic to process a single file goes here
// 	// For example, you can upload the file to a server
// 	const formData = new FormData()
// 	formData.append("file", file)

// 	// Make an API request, for example using fetch or axios
// 	const response = await fetch("/api/upload", {
// 		method: "POST",
// 		body: formData,
// 	})

// 	// Handle the response as needed
// 	const data = await response.json()
// 	console.log(data)
// }

async function uploadData(formData, uploadID) {
	try {
		await supabase.from("products").insert({
			upload_id: uploadID,
			image: formData.image,
			title: formData.title,
			type: formData.type,
			release_date: formData.releaseDate,
			release_date_long: dayjs(formData.releaseDate).format(
				"MMMM D, YYYY "
			),
			description: formData.description,
			tags: formData.tags.map((tag) => tag.name),
			genres: formData.genres.map((tag) => tag.name),
			moods: formData.moods.map((tag) => tag.name),
			keys: formData.keys,
			bpm: formData.bpm,
			instruments: formData.instruments.map((tag) => tag.name),
			price: formData.price,
		})
	} catch (error) {
		console.log(error)
	}
}

async function uploadFile(userId, uploadID, file) {
	const path = `users/${userId}/uploads/${uploadID}/file_name`
	try {
		const { error } = await supabase.storage
			.from("files")
			.upload(path, file)
		if (error) {
			throw error
		}
	} catch (error) {
		console.log(error)
	}
}
