"use client"

import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import Fade from "@mui/material/Fade"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import styles from "../styles.module.css"
import { useShoppingCart } from "@/libs/contexts/CartContext"
import { useState } from "react"
import CartItem from "./CartItem"
import Button from "@mui/material/Button"
import Link from "next/link"

export default function ShoppingCart() {
	const { shoppingCart } = useShoppingCart()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<button onClick={handleClick} className={styles.iconBtn}>
				<ShoppingCartIcon />
				<label className={styles.label}>Cart</label>
				<p>{shoppingCart && shoppingCart.length}</p>
			</button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
				sx={{
					".MuiPaper-root": {
						backgroundColor: "#121212",
						padding: 0,
					},
				}}
			>
				<div className="flex flex-col gap-4 bg-bg-elevated p-8 w-[400px]">
					<p className="text-text-primary">{`Your Cart (${shoppingCart.length})`}</p>
					{shoppingCart.map((item, index) => (
						<CartItem key={index} cartItem={item} />
					))}

					<Link href={"/checkout"}>
						<Button onClick={handleClose} fullWidth variant="outlined">Checkout</Button>
					</Link>
				</div>
			</Menu>
		</>
	)
}
