"use server"

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

		const { data: users } = await supabase.from("users").select("email")

		const emailExists = users.some((user) => user.email === email)

		if (!emailExists) {
			await supabase.auth
				.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${requestUrl.origin}/store`,
					},
				})
				.then((res) => {
					if (res.error) {
						console.log(res)
					}
				})

			await supabase.auth.signInWithPassword({
				email,
				password,
			})

			const user = (await supabase.auth.getUser()).data.user

			if (user) {
				return NextResponse.json(
					{ message: "Successful authentication" },
					{ status: 202 }
				)
			}
		} else {
			return NextResponse.json(
				{ message: "Email alread in use" },
				{ status: 409 }
			)
		}

		return NextResponse.redirect(requestUrl.origin, {
			status: 301,
		})
	} catch (error) {
		console.log(error)
	}
}
