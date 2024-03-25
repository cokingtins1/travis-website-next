"use server"

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
	const requestUrl = new URL(request.url)
	const formData = await request.json()
	const password = formData.password

	const cookieStore = cookies()
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

	const { data, error } = await supabase.auth.updateUser({
		password: password,
	})

	if (data) {
		console.log(resetData)
	} else {
		console.log(resetData)
	}

	return NextResponse.json({})
}
