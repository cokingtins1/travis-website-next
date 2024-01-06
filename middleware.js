import { NextResponse } from "next/server"

export async function middleware(req) {
    // // const body = await req.json()
    // const requestHeaders = new Headers(req.headers).get(['authorization'])
    // console.log(requestHeaders)
	// // const authHeader = await req.json().headers['authorization']

	// // const token = authHeader && authHeader.split(' ')[1]

	// // if(token==null) return Response.json({status:401})

	// // console.log(req.method)
	// // console.log(req.url)

    // // const origin = req.headers.get('origin')
    // // console.log(origin)

    // return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*'
}
