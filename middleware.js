import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { NextResponse } from "next/server"

export async function middleware(req) {
	const requestUrl = new URL(req.url)
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req, res })
	await supabase.auth.getSession()

	const path = req.nextUrl.pathname

	// const isPublicPath = path === "/login" || path === "/signup"

	const admins = [
		{
			email: "cokingtins1@gmail.com",
			id: "292e2950-49b1-4637-9697-83d33751e6f4",
		},
		{
			email: "seancokingtin@gmail.com",
			id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
		},

		{
			email: "beatsmadebyTrav@gmail.com",
			id: "26441262-5775-49d1-9edb-c6c0b07aee0c",
		},
	]

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const userId = session.user.id
	const adminSignedIn = admins.some((admin) => admin.id === userId)

	if (!session) {
		return NextResponse.redirect(`${requestUrl.origin}/login`)
	}

	if (session && !adminSignedIn) {
		return NextResponse.redirect(`${requestUrl.origin}`)
	}

	return res
}

// Private routes
export const config = {
	matcher: ["/dashboard/:path*"],
	// matcher: ["/*"],
}
