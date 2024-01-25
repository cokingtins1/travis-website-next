import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { NextResponse } from "next/server"

export async function middleware(req) {
	console.log("middleware hit")
	const requestUrl = new URL(req.url)
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })
	// supabase.auth.getSession()

	const {
		data: { session },
	} = await supabase.auth.getSession()
	console.log("Session:", session)

	if (!session) {
		return NextResponse.redirect(new URL("/login", requestUrl.origin))
	}

	// console.log("res:", res)
	return res
}

// Private routes?
export const config = {
	matcher: ["/dashboard"],
}
