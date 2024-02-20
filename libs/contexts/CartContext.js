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
		if (
			shoppingCart.some((item) => item.pricing_id === newItem.pricing_id)
		) {
			return
		}
		if (
			shoppingCart.some((item) => item.product_id === newItem.product_id)
		) {
			setShoppingCart((prevItems) => {
				const updatedItems = prevItems.map((item) =>
					item.product_id === newItem.product_id
						? { ...newItem }
						: item
				)
				return updatedItems
			})
		} else {
			setShoppingCart((prevItems) => {
				const updatedItems = Array.isArray(prevItems)
					? [...prevItems, newItem]
					: [newItem]
				return updatedItems
			})
		}
	}

	function removeFromCart(id) {
		setShoppingCart((prevItems) => {
			return prevItems.filter((item) => item.pricing_id !== id)
		})
	}

	function clearShoppingCart() {
		setShoppingCart([])
	}

	const cartTotal = shoppingCart
		? shoppingCart.reduce((acc, currentVal) => {
				return acc + currentVal.price
		  }, 0)
		: 0

	const values = {
		shoppingCart,
		cartTotal,
		addToCart,
		removeFromCart,
		clearShoppingCart,
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
