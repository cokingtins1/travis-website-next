import styles from "./styles.module.css"
import Image from "next/image"
import logoImg from "@/public/Logo.png"
import { useSession } from "@/libs/supabase/useSession"
import dynamic from "next/dynamic"
import NavBar from "./NavBar"
import AccountButton from "./AccountButton"

export default async function Header() {
	const { session } = await useSession()

	const DynamicShoppingCart = dynamic(
		() => import("./Shopping Cart Components/ShoppingCart"),
		{
			ssr: false,
		}
	)

	return (
		<>
			<header className={styles.headerWrapper}>
				<div className="grid grid-cols-3 justify-items-stretch items-center px-16 gap-8">
					<Image
						src={logoImg}
						alt="logo"
						className="flex justify-self-start"
						width={50}
					/>
					<NavBar />
					<div className="flex justify-self-end items-center gap-4">
						<AccountButton session={session} />
						<DynamicShoppingCart />
					</div>
				</div>
			</header>
		</>
	)
}
