"use client"

import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import Image from "next/image"
import logoImg from "@/public/TravLogoBlue.png"
import NavBar from "./NavBar"
import useWindowSize from "../CustomHooks/useWindowSize"
import AccountButton from "./AccountButton"
import dynamic from "next/dynamic"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import Link from "next/link"
import { useState } from "react"

export default function HeaderDrawer({ session, isAdmin }) {
	const [openDrawer, setOpenDrawer] = useState(false)
	const size = useWindowSize()

	const DynamicShoppingCart = dynamic(
		() => import("./Shopping Cart Components/ShoppingCart"),
		{
			ssr: false,
		}
	)

	const toggleDrawer = (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return
		}

		setOpenDrawer(!openDrawer)
	}

	return (
		<div
			className="sticky top-0 z-[99] bg-bg-elevated rounded-lg"
			style={{
				boxShadow: !openDrawer
					? "0px 0px 25px 0px rgba(100, 100, 100, 0.5)"
					: "none",
			}}
		>
			<div className="  flex justify-between p-4 w-full md:grid grid-cols-3 md:justify-items-stretch items-center">
				<Link href={"/#about"}>
					<div className="relative z-[100]">
						<Image
							src={logoImg}
							alt="logo"
							width={125}
							sizes="(max-width: 430px), 125px "
						/>
					</div>
				</Link>
				<div className="hidden md:block md:justify-self-center">
					<NavBar session={session} isAdmin={isAdmin} />
				</div>
				<div className="hidden md:flex md:justify-self-end gap-4">
					<AccountButton session={session} />
					<DynamicShoppingCart />
				</div>
				{size.width < 768 && (
					<IconButton
						sx={{ color: "white", textAlign: "right" }}
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
				)}
			</div>
			<SwipeableDrawer
				sx={{ zIndex: 0 }}
				anchor={"top"}
				open={openDrawer}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
				PaperProps={{
					style: {
						backgroundColor: "#121212",
						marginInline: "1rem",
						borderRadius: "8px",
						boxShadow: "0px 0px 25px 0px rgba(100, 100, 100, 0.5)",
					},
				}}
			>
				<div
					className="flex flex-col p-4 h-[220px] mt-[72px]"
					role="presentation"
					onClick={toggleDrawer}
					onKeyDown={toggleDrawer}
				>
					<NavBar session={session} orientation={"vertical"} />
					<div className="flex flex-col items-end gap-4 mt-4">
						<AccountButton />
						<DynamicShoppingCart />
					</div>
				</div>
				<div className="flex justify-center">
					<IconButton
						onClick={toggleDrawer}
						onKeyDown={toggleDrawer}
						sx={{ color: "#a7a7a7" }}
					>
						<ExpandLessIcon />
					</IconButton>
				</div>
			</SwipeableDrawer>
		</div>
	)
}
