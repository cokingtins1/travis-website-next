// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
// import { redirect } from "next/navigation"
// import { cookies } from "next/headers"

export default async function Page() {
	// const supabase = createServerComponentClient({ cookies })
	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession()

	// console.log("session:", session)
	// if (!session) {
	// 	redirect("/login")
	// }

	return (
		<main className="flex justify-center items-center mt-36">
			<div>you are signed in</div>
		</main>
	)
}
