"use client"

import styles from "./styles.module.css"
import Image from "next/image"
import logoImg from "@/public/TravLogoBlue.png"
// import { useSession } from "@/libs/supabase/useSession"
import dynamic from "next/dynamic"
import NavBar from "./NavBar"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"

import AccountButton from "./AccountButton"
import { useState } from "react"
import useWindowSize from "../CustomHooks/useWindowSize"

export default function Header({ session }) {
	const [menuOpen, setMenuOpen] = useState(false)

	const size = useWindowSize()

	const handleToggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const DynamicShoppingCart = dynamic(
		() => import("./Shopping Cart Components/ShoppingCart"),
		{
			ssr: false,
		}
	)

	return (
		<>
			{/* <header className={styles.headerWrapper}>
				<div className="md:grid grid-cols-3 justify-items-stretch items-center px-16 gap-8">
					<Image
						src={logoImg}
						alt="logo"
						width={125}
						sizes="(max-width: 430px), 125px "
					/>

					<div className="md:justify-self-center">
						<NavBar session={session} />
					</div>
					<div className="flex flex-col md:flex-row justify-self-end items-center gap-4">
						<AccountButton session={session} />
						<DynamicShoppingCart />
					</div>
				</div>
			</header> */}

			{/* <nav className={styles.headerWrapper}>
				<div className={styles.imageWrapper}>
					<Image
						src={logoImg}
						alt="logo"
						width={125}
						sizes="(max-width: 430px), 125px "
					/>
				</div>

				<div className={styles.navBarWrapper}>
					<NavBar session={session} />
				</div>
				<div className={styles.accountWrapper}>
					<AccountButton session={session} />
					<DynamicShoppingCart />
				</div>
			</nav> */}

			<header className="bg-bg-elevated rounded-lg p-4">
				<nav className="flex items-center justify-between w-[92%] mx-auto md:grid grid-cols-3 justify-items-stretch">
					<div>
						<Image
							src={logoImg}
							alt="logo"
							width={125}
							sizes="(max-width: 430px), 125px "
						/>
					</div>
					{size.width > 768 && (
						<div className="justify-self-center">
							<NavBar />
						</div>
					)}

					<div
						className={`nav-links duration-500 md:static absolute bg-bg-elevated md:min-h-fit rounded-lg ${
							menuOpen
								? "top-[7%] z-50 left-4 right-4 pb-4 rounded-none"
								: "top-[-100%]"
						} md:w-auto flex items-center px-5 md:justify-self-end`}
					>
						<ul className="flex flex-col md:flex-row md:items-center md:gap-[4vw] gap-4">
							{size.width < 768 && <NavBar />}
							<div className="flex gap-4">
								<AccountButton session={session} />
								<DynamicShoppingCart />
							</div>
						</ul>
					</div>
					{size.width < 768 && (
						<div className="flex items-center gap-6">
							<IconButton
								sx={{ color: "white" }}
								onClick={handleToggleMenu}
							>
								<MenuIcon />
							</IconButton>
						</div>
					)}
				</nav>
			</header>
		</>
	)
}
