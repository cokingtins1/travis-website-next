export const dynamic = 'force-dynamic'

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
	const requestUrl = new URL(request.url)
	const formData = await request.formData()
	const email = formData.get("email")
	const cookieStore = cookies()
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

	await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${requestUrl.origin}/update-password`,
	})

	return NextResponse.json({})
}
