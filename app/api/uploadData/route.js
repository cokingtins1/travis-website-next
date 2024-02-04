import { NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import dayjs from "dayjs"
import { cache } from "react"

export const createServerClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient({ cookies: () => cookieStore })
})

export async function POST(req) {
	const supabase = createServerClient()
	const formData = await req.json()

	if (formData) {
		try {
			await supabase.from("products").insert({
				upload_id: formData.upload_id,
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

	console.log("JSON data from server:", formData)

	return NextResponse.json({ success: true })
}
