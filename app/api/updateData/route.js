import { getProductFilePathById } from "@/libs/supabase/supabaseQuery"
import { useSession } from "@/libs/supabase/useSession"
import { returnArray } from "@/libs/utils"
import { NextResponse } from "next/server"

export async function PUT(req) {
	const { supabase } = await useSession()
	const formData = await req.formData()
	const product_id = await formData.get("product_id")
	const { pricingId } = await getProductFilePathById(product_id)
	const [MP3_file_id, WAV_file_id, STEM_file_id] = pricingId

	const file_url_mp3 = `${product_id}/${MP3_file_id}`
	const file_url_wav = `${product_id}/${WAV_file_id}`
	const file_url_zip = `${product_id}/${STEM_file_id}`

	async function uploadFile(path, file) {
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
					bpm: formData.get("bpm"),

					free: formData.get("free"),
				})
				.eq("id", product_id)
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

			for (const e of formData) {
				const key = e[0]
				const value = e[1]

				if (value instanceof File) {
					// catch STEM files for now. Will upgrade to pro soon.
					if (value.type === "application/x-zip-compressed") {
						return NextResponse.json({ success: true })
					} else if (value.type.split("/")[0] == "image") {
						const imagePath = `${product_id}/productImage/${value.name}`
						await uploadFile(imagePath, value)
					} else if (value.name.endsWith(".mp3")) {
						await uploadFile(file_url_mp3, value)
					} else if (value.name.endsWith(".wav")) {
						await uploadFile(file_url_wav, value)
					} else if (value.name.endsWith(".zip")) {
						await uploadFile(file_url_zip, value)
					}
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	return NextResponse.json(
		{ message: "Fields updated successfully" },
		{ status: 200 }
	)
}
