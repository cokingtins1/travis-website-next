import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request) {
	console.log("here logout")
	const requestUrl = new URL(request.url)
	const cookieStore = cookies()
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

	await supabase.auth.signOut()
	// revalidatePath("/", "layout")

	// return NextResponse.redirect(`${requestUrl.origin}/login`, {
	// 	status: 301,
	// })
	return NextResponse.redirect(`${requestUrl.origin}/test-upload-client`, {
		status: 301,
	})
}
