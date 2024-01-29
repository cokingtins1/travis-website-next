import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import supabaseClient from "@/libs/supabase/config/supabaseClient"
import sql from "@/libs/supabase/query"

export default async function Page() {
	// const cookieStore = cookies()
	// const supabase = createServerComponentClient({ cookies: () => cookieStore })
	// const { data } = await supabase.from("products").select()

	const { data: dataQuery } = await supabaseClient
		.from("products")
		.select("*")

	// async function queryDB() {
	// 	const products = await sql`
	// 		select * from products
	// 		`
	// 	return products
	// }

	// console.log(await queryDB())

	return <pre>{JSON.stringify(dataQuery, null, 2)}</pre>
}
