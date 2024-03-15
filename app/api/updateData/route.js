import { returnArray } from "@/libs/utils"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { getPricingIdById } from "@/libs/supabase/supabaseQuery"
import { useSession } from "@/libs/supabase/useSession"

export async function PUT(req) {
	const formData = await req.formData()
	const product_id = await formData.get("product_id")
	const pricingId = await getPricingIdById(product_id)
	const [MP3_file_id, WAV_file_id, STEM_file_id] = pricingId

	const { supabase } = useSession()

	const file_url_mp3 = `${product_id}/${MP3_file_id}`
	const file_url_wav = `${product_id}/${WAV_file_id}`
	const file_url_zip = `${product_id}/${STEM_file_id}`

	const url = headers().get("referer")

	async function modifyStorage(path, file, update, deleteFlag) {
		//if upload is true, file did not exist in the first place -> check if new file has been uploaded by checking path !== undefined
		// if file did not change, it will not log an instance of file since and will never reach this function so it's all good.

		//if update === 'true' && !path => file was removed => remove file from supa

		if (update === "true" && file) {
			try {
				const { error } = await supabase.storage
					.from("all_products")
					.update(path, file, { cacheControl: "3600" })
				if (error) {
					throw error
				}
			} catch (error) {
				console.log(error)
			}
		} else if (update === "false" && file) {
			try {
				const { error } = await supabase.storage
					.from("all_products")
					.upload(path, file)
				if (error) {
					throw error
				}
			} catch (error) {
				console.log(error)
			}
		} else if (deleteFlag === "true") {
			try {
				const { error } = await supabase.storage
					.from("all_products")
					.remove(path)
				if (error) {
					throw error
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	if (formData) {
		try {
			await supabase
				.from("products")
				.update({
					title: formData.get("title"),
					type: formData.get("type"),
					description: formData.get("description"),
					tags: returnArray("tags", formData),
					genres: returnArray("genres", formData),
					moods: returnArray("moods", formData),
					instruments: returnArray("instruments", formData),
					keys: formData.get("keys"),
					bpm: formData.get("bpm") === "" ? 0 : formData.get("bpm"),
					video_link: formData.get("videoLink"),

					free: formData.get("free"),
				})
				.eq("id", product_id)
				.then((res) => {
					if (res.error) {
						console.log(res.error.message)
					} else {
						console.log("update successfull")
					}
				})
		} catch (error) {
			console.log(error)
		}

		try {
			await supabase
				.from("pricing")
				.update({
					is_active: formData.get("basic"),
					price: formData.get("basicPrice"),
				})
				.eq("product_id", product_id)
				.eq("type_id", "basic")

			await supabase
				.from("pricing")
				.update({
					is_active: formData.get("premium"),
					price: formData.get("premiumPrice"),
				})
				.eq("product_id", product_id)
				.eq("type_id", "premium")

			await supabase
				.from("pricing")
				.update({
					is_active: formData.get("exclusive"),
					price: formData.get("exclusivePrice"),
				})
				.eq("product_id", product_id)
				.eq("type_id", "exclusive")

			// Deleting files
			if (formData.get("basicFileDelete") === "true") {
				await modifyStorage(file_url_mp3, null, null, "true")
			}
			if (formData.get("premiumFileDelete") === "true") {
				await modifyStorage(file_url_wav, null, null, "true")
			}
			if (formData.get("exclusiveFileDelete") === "true") {
				await modifyStorage(file_url_zip, null, null, "true")
			}

			// Inserting or updating files
			for (const e of formData) {
				const key = e[0]
				const value = e[1]

				if (value instanceof File) {
					// catch STEM files for now. Will upgrade to pro soon.
					console.log(value)
					if (value.type === "application/x-zip-compressed") {
						return NextResponse.json({ success: true })
					} else if (value.type.split("/")[0] == "image") {
						const imagePath = `${product_id}/productImage/${value.name}`
						await modifyStorage(imagePath, value, true)
					} else if (value.name.endsWith(".mp3")) {
						await modifyStorage(
							file_url_mp3,
							value,
							formData.get("MP3_update"),
							formData.get("basicFileDelete")
						)
					} else if (value.name.endsWith(".wav")) {
						console.log("updating wav")
						await modifyStorage(
							file_url_wav,
							value,
							formData.get("WAV_update"),
							formData.get("premiumFileDelete")
						)
					} else if (value.name.endsWith(".zip")) {
						await modifyStorage(
							file_url_zip,
							value,
							formData.get("STEM_update"),
							formData.get("exclusiveFileDelete")
						)
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
	}
	revalidatePath("/")

	return NextResponse.json(
		{ message: "Fields updated successfully" },
		{ status: 200 }
	)
}
