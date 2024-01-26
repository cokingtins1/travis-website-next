import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { NextResponse } from "next/server"

export async function middleware(req) {
	console.log("middleware hit")
	const requestUrl = new URL(req.url)
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })
	await supabase.auth.getSession()

	const path = req.nextUrl.pathname

	const isPublicPath = path === "/login" || path === "/signup"

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (isPublicPath && session) {
		return NextResponse.redirect(`${requestUrl.origin}`)
	}

	// if (!isPublicPath && !session) {
	// 	return NextResponse.redirect(`${requestUrl.origin}/`)
	// }

	// if (!session) {
	// 	return NextResponse.redirect(`${requestUrl.origin}/login`)
	// }

	return res
}

// Private routes
// export const config = {
// 	matcher: ["/dashboard/:path*"],
// 	// matcher: ["/*"],
// }
