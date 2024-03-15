"use server"

import supabaseServer from "./supabaseServer"

export async function useSession() {
	const supabase = await supabaseServer()
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
