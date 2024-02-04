"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import dayjs from "dayjs"

const supabase = createServerActionClient({ cookies })

export async function addProducts(formData) {
	console.log("submitting form on server")

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const userId = user.id
	const uploadID = crypto.randomUUID()

	const MP3file = formData.MP3_file
	const MP3fileName = formData.MP3_fileName
	const WAVfile = formData.WAV_file
	const WAVfileName = formData.WAV_fileName
	const STEMfile = formData.STEM_file
	const STEMfileName = formData.STEM_fileName

	async function uploadFile(file, fileName) {
		const path = `users/${userId}/uploads/${uploadID}/${fileName}`
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

	if (MP3file) {
		await uploadFile(MP3file, MP3fileName)
	}
	if (WAVfile) {
		await uploadFile(WAVfile, WAVfileName)
	}
	if (STEMfile) {
		await uploadFile(STEMfile, STEMfileName)
	}

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
