import { uploadFile } from '@/libs/supabase/uploadFile'
import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(req) {
	const data = await req.formData()
	const file = data.get("file")

	if (!file) {
		return NextResponse.json({ success: false })
	}

	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)

	const path = join('/',"tmp", file.name)
	await uploadFile('new file', 'upload music test', buffer )
	await writeFile(path, buffer)
	console.log(`open ${path} to see the uploaded file`)

	return NextResponse.json({ success: true })
}
