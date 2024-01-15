"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth"

import { createFirebaseApp } from "../firebase/serverApp"

const AuthContext = createContext()

// return the current context value of AuthContext
export function useAuth() {
	return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [loadingUser, setLoadingUser] = useState(true)

	const app = createFirebaseApp()
	const auth = getAuth(app)

	function signup(email, password) {
		// if I don't want to use firebase, just replace below. See 33:05
		return createUserWithEmailAndPassword(auth, email, password)
	}

	function login(email, password) {
		// if I don't want to use firebase, just replace below. See 33:05
		return signInWithEmailAndPassword(auth, email, password)
	}

	function logout() {
		return signOut(auth)
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(auth, email)
	}

	useEffect(() => {
		const unsubscriber = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoadingUser(false)
		})
		return unsubscriber
	}, [])

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
	}

	// Anything wrapped in the AuthContext component will have access to the 'value' object
	return (
		<AuthContext.Provider value={value}>
			{!loadingUser && children}
		</AuthContext.Provider>
	)
}
