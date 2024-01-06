import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { redirect } from "next/dist/server/api-utils"

export async function POST(req, res) {
	const users = []

	if (req.method === "POST") {
		const body = await req.json()
		try {
			const hashedPassword = await bcrypt.hash(body.password, 10)
			users.push({
				id: Date.now().toString(),
				email: body.email,
				password: hashedPassword,
			})
			redirect("/login")
		} catch (error) {}
	} else {
		redirect("/signup")
	}

	console.log(users)

	return Response.json({ message: "ajsshgljakg" })
}
