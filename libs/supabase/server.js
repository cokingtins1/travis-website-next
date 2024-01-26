import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerActionClient({ cookies })

export async function getSession() {
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		return true
	} else {
		return false
	}
}

export { supabase }
