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

	function addToCart(newItem) {
		if (shoppingCart.some((item) => item.id === newItem.id && item.type === newItem.type)) return

		setShoppingCart((prevItems) => {
			const updatedItems = Array.isArray(prevItems)
				? [...prevItems, newItem]
				: [newItem]
			return updatedItems
		})
	}

	function removeFromCart(id) {
		setShoppingCart((prevItems) => {
			return prevItems.filter((item) => item.id !== id)
		})
	}

	const values = {
		shoppingCart,
		addToCart,
		removeFromCart,
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
