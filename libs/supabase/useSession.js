import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerActionClient({ cookies })

export async function useSession() {
	const {
		data: { session },
	} = await supabase.auth.getSession()

	let id
	if (session) {
		const {
			user: { id: userId },
		} = session
		id = userId
	}

	return { session, id }
}
