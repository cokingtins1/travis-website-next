import { NextResponse } from "next/server"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// export async function POST(req) {
// 	const { productName, cost } = await req.json()
// 	await connectMongoDB()
// 	const newProduct = await Product.create({ productName, cost })
// 	return NextResponse.json({ message: "Product Created" }, { status: 201 })
// }

export async function GET(req) {
	const res = req.json()
	console.log(res)

	return "this is the response", NextResponse.json({ products })
}

// export async function DELETE(req){
//     const id = req.nextUrl.searchParams.get('id')
//     await connectMongoDB()
//     await Product.findByIdAndDelete(id)
//     return NextResponse.json({message: 'Product Deleted'}, {status: 201})
// }

// export async function Test() {
//     const result = await Product.findById('65900d76e82f15967b7b0131')
// 	return NextResponse.json({message: 'you did it'})
// }
