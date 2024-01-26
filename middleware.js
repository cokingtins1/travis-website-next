import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { NextResponse } from "next/server"

export async function middleware(req) {
	// console.log("middleware hit")
	const requestUrl = new URL(req.url)
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })
	supabase.auth.getSession()

	return res
}

// Private routes?
// export const config = {
// 	// matcher: ["/test-upload-client"],
// }
