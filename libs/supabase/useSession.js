"use server"

import { getAdmin } from "./getAdmin"
import supabaseServer from "./supabaseServer"

export async function useSession() {
	const supabase = await supabaseServer()
	const {
		data: { session },
	} = await supabase.auth.getSession()
	let id
	let isAdmin = false
	if (session) {
		const {
			user: { id: userId },
		} = session
		id = userId
		isAdmin = getAdmin(id)
	}


	return { supabase, session, id, isAdmin }
}
