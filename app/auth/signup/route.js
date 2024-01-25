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

		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${requestUrl.origin}/auth/callback`,
			},
		})

		return NextResponse.redirect(requestUrl.origin, {
			status: 301,
		})
	} catch (error) {
		console.log(error)
	}
}
