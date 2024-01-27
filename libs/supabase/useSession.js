import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function useSession() {
	const supabase = createServerActionClient({ cookies })
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

	return { supabase, session, id }
}
