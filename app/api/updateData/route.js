import { useSession } from "@/libs/supabase/useSession"
import { NextResponse } from "next/server"

export async function PUT(req) {
	const { supabase } = await useSession()
	const formData = await req.json()
	const upload_id = await formData.upload_id

	if (formData) {
		try {
			await supabase
				.from("products")
				.update({
					title: formData.title,
					type: formData.type,
					description: formData.description,
					tags: formData.tags.map((tag) => tag.name),
					genres: formData.genres.map((tag) => tag.name),
					moods: formData.moods.map((tag) => tag.name),
					keys: formData.keys,
					bpm: formData.bpm,
					instruments: formData.instruments.map((tag) => tag.name),
					basic: formData.basic,
					basic_price: formData.basicPrice,
					premium: formData.premium,
					premium_price: formData.premiumPrice,
					exclusive: formData.exclusive,
					exclusive_price: formData.exclusivePrice,
					free: formData.free,
				})
				.eq("upload_id", upload_id)
		} catch (error) {
			console.log(error)
		}
	}

	return NextResponse.json(
		{ message: "Fields updated successfully" },
		{ status: 200 }
	)
}
