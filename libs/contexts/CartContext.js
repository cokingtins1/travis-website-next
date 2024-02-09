// "use client"

// import { createContext, useContext } from "react"
// import { useLocalStorage } from "../../app/components/CustomHooks/useLocalStorage"

// const Context = createContext(null)

// export default function CartContext({ children }) {
// 	let shoppingCart
// 	let setShoppingCart
// 	const SESSION_STORAGE_KEY = "SHOPPING_CART"

// 	if (typeof window !== "undefined") {
// 		;[shoppingCart, setShoppingCart] = useLocalStorage(
// 			"SHOPPING_CART",
// 			loadCart()
// 		)

// 		function addToCart(newItem) {
// 			setShoppingCart((prevItems) => {
// 				const updatedItems = Array.isArray(prevItems)
// 					? [...prevItems, newItem]
// 					: [newItem]
// 				return updatedItems
// 			})
// 		}

// 		function loadCart() {
// 			const cart = localStorage.getItem(SESSION_STORAGE_KEY)
// 			return JSON.parse(cart) || []
// 		}
//         const values = [shoppingCart, addToCart, loadCart]
// 	}

// 	return <Context.Provider value={values}>{children}</Context.Provider>
// }

// export const useCart = () => {
// 	const context = useContext(Context)
// 	if (context === undefined) {
// 		throw new Error("useCart must be used inside CartProvider")
// 	}

// 	return context
// }
