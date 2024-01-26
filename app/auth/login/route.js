import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
	try {
		const requestUrl = new URL(request.url)
		const formData = await request.json()
		const email = formData.email
		const password = formData.password
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient({
			cookies: () => cookieStore,
		})

		await supabase.auth.signInWithPassword({
			email,
			password,
		})

		const user = (await supabase.auth.getUser()).data.user

		if (user) {
			return NextResponse.redirect(
				`${requestUrl.origin}/test-upload-client`,
				{
					status: 301,
				}
			)
		} else {
			return NextResponse.json(
				{ error: "failed to authenticate" },
				{ status: 401 }
			)
		}
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ error: "An error occurred during authentication" },
			{ status: 500 }
		)
	}
}
