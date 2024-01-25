import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { NextResponse } from "next/server"

export async function middleware(req) {
	console.log("middleware hit")
	const requestUrl = new URL(req.url)
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })
	const user = (await supabase.auth.getUser()).data.user

	const path = req.nextUrl.pathname
	const token = req.cookies.get("sb-njowjcfiaxbnflrcwcep-auth-token")
	// console.log(token)

	const isPublicPath = requestUrl === "/login" || requestUrl === "/signup"

	// if (!user) {
	// 	return NextResponse.redirect(new URL("/login", requestUrl.origin))
	// } else {
	// 	return res
	// 	// return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
	// }
	// await supabase.auth.getSession()

	// const user = await supabase.auth.getUser()
	// console.log(user.data.user === null)
	return res
}

// Private routes?
// export const config = {
// 	matcher: ["/", "/login", "/signup", "/dashboard"],
// }
