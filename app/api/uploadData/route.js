import { NextResponse } from "next/server"
import dayjs from "dayjs"
import { returnArray } from "@/libs/utils"
import { revalidatePath } from "next/cache"
import { useSession } from "@/libs/supabase/useSession"

export async function POST(req) {
	const { supabase } = await useSession()

	const formData = await req.formData()

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
			// Foreign Keys:
			const product_id = crypto.randomUUID()

			const pricing_id_mp3 = crypto.randomUUID()
			const pricing_id_wav = crypto.randomUUID()
			const pricing_id_zip = crypto.randomUUID()

			// Storage Foreign Keys:
			const file_url_mp3 = `${product_id}/${pricing_id_mp3}`
			const file_url_wav = `${product_id}/${pricing_id_wav}`
			const file_url_zip = `${product_id}/${pricing_id_zip}`

			await supabase.from("products").insert({
				id: product_id,

				title: formData.get("title"),
				type: formData.get("type"),
				release_date: formData.get("releaseDate"),
				release_date_long: dayjs(formData.get("releaseDate")).format(
					"MMMM D, YYYY "
				),
				description: formData.get("description"),
				tags: returnArray("tags", formData),
				genres: returnArray("genres", formData),
				moods: returnArray("moods", formData),
				instruments: returnArray("instruments", formData),
				keys: formData.get("keys"),
				bpm: formData.get("bpm"),
				video_link: formData.get("videoLink"),

				free: formData.get("free"),
			})

			await supabase.from("pricing").insert({
				pricing_id: pricing_id_mp3,
				product_id: product_id,
				type_id: "basic",
				is_active: formData.get("basic"),
				price: formData.get("basicPrice"),
			})

			await supabase.from("pricing").insert({
				pricing_id: pricing_id_wav,
				product_id: product_id,
				type_id: "premium",
				is_active: formData.get("premium"),
				price: formData.get("premiumPrice"),
			})

			await supabase.from("pricing").insert({
				pricing_id: pricing_id_zip,
				product_id: product_id,
				type_id: "exclusive",
				is_active: formData.get("exclusive"),
				price: formData.get("exclusivePrice"),
			})

			await supabase.from("product_files").insert({
				product_id: product_id,
				pricing_id: pricing_id_mp3,
				file_extension: ".mp3",
				file_url: file_url_mp3,
			})

			await supabase.from("product_files").insert({
				product_id: product_id,
				pricing_id: pricing_id_wav,
				file_extension: ".wav",
				file_url: file_url_wav,
			})

			await supabase.from("product_files").insert({
				product_id: product_id,
				pricing_id: pricing_id_zip,
				file_extension: ".zip",
				file_url: file_url_zip,
			})

			await supabase.from("product_likes").insert({
				product_id: product_id,
				likes: 0,
				liked_by: null,
			})

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

			return NextResponse.json(
				{ message: "Product was uploaded susccessfully" },
				{ status: 201 }
			)
		} catch (error) {
			console.error("Error inserting data", error)

			return NextResponse.json(
				{ message: "Error uploading product data" },
				{ status: 500 }
			)
		}
	}
	revalidatePath("/")

	return NextResponse.json({ message: "Missing form data" }, { status: 400 })
}
