import { NextResponse } from "next/server"

export async function POST(req) {
	const formData = await req.formData()

	console.log("File data from server:", formData)

	return NextResponse.json({ success: true })
}
