import { NextResponse } from "next/server"

// export async function POST(req, res) {

// 	try {
// 		const data = await json(req, {limit: '1mb'})
// 	} catch (error) {

// 	}
// 	function validateLogin(email, password, passVerify) {
// 		// console.log(email, password, passVerify)
// 	}

// 	// validateLogin(email, password, passVerify)

// 	// res.status(200).json({ message: "login verified" })
// 	// return NextResponse.json({message: 'you did it'})
// 	console.log(data)
// 	return new Response(" this is the message", { status: 200 })
// }

export async function POST(req, res) {
	if (req.method === "POST") {
		const body = await req.json()
		console.log(body)
	} else {
		console.log("not a post")
	}

	return Response.json({message: 'ajsshgljakg'})
}
