"use client"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import styles from "./styles.module.css"
import { useEffect } from 'react'
import { useState } from "react"
import { useLocalStorage } from "../CustomHooks/useLocalStorage"

export default function ShoppingCart() {

	const SESSION_STORAGE_KEY = "SHOPPING_CART"
	
	const [shoppingCart, setShoppingCart] = useLocalStorage(
		"SHOPPING_CART",
		loadCart()
		)
		
		function loadCart() {
			const cart = localStorage.getItem(SESSION_STORAGE_KEY)
			return JSON.parse(cart) || []
		}
		// useEffect(() => {
		// 	loadCart()
		// }, [shoppingCart])

	return (
		<button type="submit" className={styles.iconBtn}>
			<ShoppingCartIcon />
			<label className={styles.label}>Cart</label>
			{/* <p>{shoppingCart.length}</p> */}
		</button>
	)
}
