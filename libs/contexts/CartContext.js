"use client"

import { useLocalStorage } from "@/app/components/CustomHooks/useLocalStorage"
import React, { createContext, useContext } from "react"

const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
	const SESSION_STORAGE_KEY = "SHOPPING_CART"

	const [shoppingCart, setShoppingCart] = useLocalStorage(
		SESSION_STORAGE_KEY,
		loadCart()
	)

	function loadCart() {
		if (typeof localStorage !== "undefined") {
			const cart = localStorage.getItem(SESSION_STORAGE_KEY)
			return JSON.parse(cart) || []
		}
	}

	const addToCart = (newItem) => {
		setShoppingCart((prevItems) => {
			const updatedItems = Array.isArray(prevItems)
				? [...prevItems, newItem]
				: [newItem]
			return updatedItems
		})
	}

	const values = {
		shoppingCart,
		addToCart,
	}

	return (
		<ShoppingCartContext.Provider value={values}>
			{children}
		</ShoppingCartContext.Provider>
	)
}

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext)
}
