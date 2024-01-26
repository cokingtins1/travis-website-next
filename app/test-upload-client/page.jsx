"use client"

import { useSupabase } from "@/libs/supabase/supabase-context"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

export default function Page() {
	// Getting user data from supabase using client component
	const { supabase, session, currentUser } = useSupabase()
	const [products, setProducts] = useState()

	// console.log(currentUser)

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const { data } = await supabase.from("products").select()
	// 		setProducts(data)
	// 	}

	// 	getData()
	// }, [])

	// console.log("session:", session)
	// if (session) {
	// 	console.log("isSession:", true)
	// } else {
	// 	console.log("isSession:", false)
	// }

	return (
		<main className="flex justify-center items-center mt-36">
			{session && (
				<div className="text-emerald-600">"You are signed in!"</div>
			)}

			{products && (
				<p className="text-wrap">{JSON.stringify(products)}</p>
			)}
			{!session && (
				<div className="text-rose-600">"You are signed out"</div>
			)}
		</main>
	)
}
