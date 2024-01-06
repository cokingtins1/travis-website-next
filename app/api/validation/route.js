import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { redirect } from "next/dist/server/api-utils"
import passport from "passport"

import initializePassport from "@/libs/passport-config"

export async function POST(req, res) {
	const users = []
	// initializePassport(passport, (email) => {
	// 	return users.find((user) => user.email === email)
	// })

	if (req.method === "POST") {
		const body = await req.json()
		try {
			const hashedPassword = await bcrypt.hash(body.password, 10)
			users.push({
				id: Date.now().toString(),
				email: body.email,
				password: hashedPassword,
			})
			console.log("hashed pwd:", hashedPassword)
			redirect("/login")
		} catch (error) {}
	} else {
		redirect("/signup")
	}

	console.log(users)

	return Response.json(users)
}

// Using JWT

// import jwt from "jsonwebtoken"
// import { middleware } from '@/middleware'

// export async function POST(req, res) {
// 	const users = []
// 	// initializePassport(passport, (email) => {
// 	// 	return users.find((user) => user.email === email)
// 	// })

// 	if (req.method === "POST") {
// 		const body = await req.json()
// 		const username = body.username
// 		const user = { name: username }

// 		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
// 		await middleware(req)
// 		return Response.json({accessToken: accessToken})

// 	}
// 	 else {
// 		console.log("error")
// 	}

// 	// console.log(users)

// 	// return Response.json(users)
// }
