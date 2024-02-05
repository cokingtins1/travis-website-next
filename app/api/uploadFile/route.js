import { NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

export const createServerClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient({ cookies: () => cookieStore })
})

export async function POST(req) {
	const formData = await req.formData()

	const supabase = createServerClient()

	const productFileURL =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const userId = user.id
	const upload_id = formData.get("upload_id")

	async function uploadFile(path, file) {
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

	async function uploadImage(path, file) {
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

	for (const e of formData) {
		const key = e[0]
		const value = e[1]

		if (value instanceof File) {
			// catch STEM files for now. Will upgrade to pro soon.
			if (value.type === "application/x-zip-compressed") {
				return NextResponse.json({ success: true })
			} else if (value.type.split("/")[0] == "image") {
				const imagePath = `${upload_id}/productImage/${value.name}`
				await uploadImage(imagePath, value)
			} else {
				const filePath = `users/${userId}/uploads/${upload_id}/${key}/${value.name}`
				await uploadFile(filePath, value)
			}
		}
	}

	return NextResponse.json(
		{ message: "Files were uploaded susccessfully" },
		{ status: 201 }
	)
}
