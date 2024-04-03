// "use server"

// // import { useAuth } from "@/libs/contexts/UserContext"
// import { redirect } from "next/navigation"
// import { cookies } from "next/headers"
// import { createServerActionClient } from "@supabase/auth-helpers-nextjs"



// export default async function PrivateRoute({ component: Component, ...rest }) {
// 	// const { currentUser } = useAuth()

// 	const supabase = createServerActionClient({ cookies })

// 	const {
// 		data: { session },
// 	} = await supabase.auth.getSession()

// 	if (!session) {
// 		redirect("/login")
// 	}

// 	return <Component {...rest} />
// }
