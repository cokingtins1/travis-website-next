"use client"

import Menu from "@mui/material/Menu"
import Divider from "@mui/material/Divider"

import Fade from "@mui/material/Fade"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useShoppingCart } from "@/libs/contexts/CartContext"
import { useState } from "react"
import CartItem from "./CartItem"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/libs/utils"

export default function ShoppingCart() {
	const { shoppingCart, cartTotal, clearShoppingCart } = useShoppingCart()
	const router = useRouter()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	async function handleCheckout(e) {
		e.preventDefault()

		try {
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(shoppingCart),
			})

			if (res.ok) {
				const redirect = await res.json()
				clearShoppingCart()
				router.push(redirect)
			} else {
				console.log("there was an error going to checkout")
			}
		} catch (error) {
			console.log(error)
		}
	}

	const buttonStyles = {
		width: "120px",
		height: "36px",
	}

	return (
		<>
			<Button
				sx={buttonStyles}
				variant="outlined"
				startIcon={<ShoppingCartIcon />}
				onClick={handleClick}
			>
				<div className="relative flex pointer gap-2">
					<p>Cart</p>
					{shoppingCart.length > 0 ? (
						<p>{shoppingCart.length}</p>
					) : (
						""
					)}
				</div>
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
				MenuListProps={{ sx: { py: 0 } }}
			>
				<div className="flex flex-col gap-4 bg-bg-elevated p-8 md:w-[400px] border border-slate-600">
					<p className="text-text-primary">{`Your Cart ${
						shoppingCart.length > 0
							? `(${shoppingCart.length})`
							: ""
					}`}</p>

					{shoppingCart.map((item, index) => (
						<CartItem key={index} cartItem={item} />
					))}
					{shoppingCart.length > 0 && (
						<>
							<Divider sx={{ backgroundColor: "#a7a7a7" }} />
							<div className="flex justify-between">
								<p className="text-text-primary">{`Total (${
									shoppingCart.length
								} ${
									shoppingCart.length > 1 ? "items" : "item"
								}) `}</p>
								<p className="text-text-primary">
									{formatCurrency(cartTotal)}
								</p>
							</div>
						</>
					)}
					<Button
						onClick={(e) => {
							if (shoppingCart.length === 0) return
							handleCheckout(e)
							handleClose()
						}}
						fullWidth
						variant="outlined"
					>
						Checkout
					</Button>
				</div>
			</Menu>
		</>
	)
}
