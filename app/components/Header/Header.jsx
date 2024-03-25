"use client"

import Image from "next/image"
import logoImg from "@/public/TravLogoBlue.png"
import dynamic from "next/dynamic"
import NavBar from "./NavBar"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"

import AccountButton from "./AccountButton"
import { useState } from "react"
import useWindowSize from "../CustomHooks/useWindowSize"

export default function Header({ session, isAdmin }) {
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
			<header className=" bg-bg-elevated rounded-lg p-4">
				<nav className="flex items-center justify-between w-[92%] mx-auto md:grid grid-cols-3 justify-items-stretch">
					<div className="relative z-50">
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
							menuOpen &&
							size.width < 768 &&
							"top-[7%] z-40 left-4 right-4 pb-4 rounded-t-none h-[220px]"
						} ${
							!menuOpen && size.width < 768 && "hidden -top-full"
						}  md:w-auto flex items-center px-5 md:justify-self-end`}
					>
						<ul className="flex flex-col md:flex-row md:items-center md:gap-[4vw] gap-4">
							{size.width < 768 && (
								<NavBar setMenuOpen={setMenuOpen} isAdmin={isAdmin} />
							)}
							<div className="flex flex-col items gap-4 h-[88px] md:flex-row md:h-fit">
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
