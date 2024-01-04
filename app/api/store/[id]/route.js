import connectMongoDB from "@/libs/mongodb"
import Product from "@/models/store"
import { NextResponse } from "next/server"

export async function GET(req, {params}) {
    const {id} = params
	await connectMongoDB()
	const product = await Product.findOne({ _id: id })
	return NextResponse.json({ product }, { status: 200 })
}
