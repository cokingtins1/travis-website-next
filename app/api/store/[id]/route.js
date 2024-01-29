import supabaseClient from "@/libs/supabase/config/supabaseClient"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
	const { id } = params
	const { data: product } = await supabaseClient
		.from("products")
		.select("*")
		.match({ id })
		.single()
	return NextResponse.json({ product }, { status: 200 })
}
