import { constructData } from "@/libs/supabase/supabseStoreData"
import { NextResponse } from "next/server"

export async function GET() {
	const data = await constructData()

	return NextResponse.json({ data: data })
}
