import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
	// const requestUrl = new URL(request.url)
	// const formData = await request.json()
	// const email = formData.email
	// const password = formData.password
	// const cookieStore = cookies()
	// const supabase = createRouteHandlerClient({
	// 	cookies: () => cookieStore,
	// })

	// await supabase.auth.signInWithPassword({
	// 	email,
	// 	password,
	// })

	// return NextResponse.redirect(requestUrl.origin, {
	// 	status: 303,
	// })

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
			return NextResponse.json(
				{ redirectUrl: `${requestUrl.origin}/dashboard` },
				{ message: "Successful authentication" },
				{ status: 200 }
			)
		} else {
			return NextResponse.json(
				{ message: "Failed to authenticate" },
				{ status: 401 }
			)
		}
	} catch (error) {
		return NextResponse.json(
			{ message: `${error} An error occurred during authentication` },
			{ status: 500 }
		)
	}
}
