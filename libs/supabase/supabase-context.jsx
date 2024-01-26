"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext(null)

export default function SupabaseContext({ children }) {
	const router = useRouter()
	const [supabase] = useState(() => createClientComponentClient())
	const [session, setSession] = useState(null)
	const [currentUser, setCurrentUser] = useState(null)

	const clientSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		})
		router.refresh()
	}

	const clientSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password,
		})
		router.refresh()
	}

	const clientSignOut = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	// useEffect(() => {
	// 	const {
	// 		data: { subscription },
	// 	} = supabase.auth.onAuthStateChange(() => {
	// 		setSession(
	// 			supabase.auth.getSession().then((response) => {
	// 				setSession(response.data.session)
	// 			})
	// 		)
	// 		setCurrentUser(session.user.id)
	// 		router.refresh()
	// 	})

	// 	return () => {
	// 		subscription.unsubscribe()
	// 	}
	// }, [supabase, router])

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") {
				setSession(null)
			} else if (session) {
				setSession(session)
			}
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	// supabase.auth.onAuthStateChange((event, session) => {
	// 	if (event === "INITIAL_SESSION") {
	// 		console.log(event)
	// 		console.log(session.user.id)
	// 	} else if (event === "SIGNED_IN") {
	// 		console.log(event)
	// 	} else if (event === "SIGNED_OUT") {
	// 		console.log(event)
	// 	} else if (event === "PASSWORD_RECOVERY") {
	// 		console.log(event)
	// 	} else if (event === "TOKEN_REFRESHED") {
	// 		console.log(event)
	// 	} else if (event === "USER_UPDATED") {
	// 		console.log(event)
	// 	}
	// })

	const values = {
		supabase,
		session,
		clientSignUp,
		clientSignIn,
		clientSignOut,
	}

	return <Context.Provider value={values}>{children}</Context.Provider>
}

export const useSupabase = () => {
	const context = useContext(Context)

	if (context === undefined) {
		throw new Error("useSupabase must be used inside SupabaseProvider")
	}

	return context
}
