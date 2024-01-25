import { useRouter } from "next/navigation"
import supabase from "./config/supabaseClient"

export async function signup(email, password) {
	const router = useRouter()

	await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			emailRedirectTo: `${location.origin}/auth/callback`,
		},
	})

	router.refresh()
}

export async function login(email, password) {
	await supabase.auth.signInWithPassword({
		email,
		password,
	})
	router.refresh()
}

export async function signout(){
	await supabase.auth.signOut()
    router.refresh()
}