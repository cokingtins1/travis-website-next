import styles from "./styles.module.css"
import AccountCircle from "@mui/icons-material/AccountCircle"
import Link from "next/link"
import Image from "next/image"
import logoImg from "@/public/Logo.png"
import { useSession } from "@/libs/supabase/useSession"
import dynamic from "next/dynamic"

export default async function Header() {
	const { session } = await useSession()

	const DynamicShoppingCart = dynamic(() => import("./Shopping Cart Components/ShoppingCart"), {
		ssr: false,
	})

	return (
		<>
			<header className={styles.headerWrapper}>
				<div className={styles.headerTop}>
					<Image
						src={logoImg}
						alt="logo"
						className="flex justify-start"
						width={50}
					/>
					<div></div>
					<div className={styles.adminButtons}>
						{session ? (
							<form action="/auth/logout" method="post">
								<button
									type="submit"
									className={styles.iconBtn}
								>
									<AccountCircle />
									<label className={styles.label} htmlFor="">
										Logout
									</label>
								</button>
							</form>
						) : (
							<Link href={"/login"}>
								<button className={styles.iconBtn}>
									<AccountCircle />
									<label className={styles.label} htmlFor="">
										Login
									</label>
								</button>
							</Link>
						)}
						{/* <Link href={"/checkout"}>
						</Link> */}
						<DynamicShoppingCart />
					</div>
				</div>
				<nav className={styles.navWrapper}>
					<Link href={"/"} className={styles.navLink}>
						Home
					</Link>
					<Link href={"/store"} className={styles.navLink}>
						Store
					</Link>
					<Link href={"/sandbox"} className={styles.navLink}>
						Sandbox
					</Link>
					<Link href={"/store-server"} className={styles.navLink}>
						store-server
					</Link>
					<Link
						href={"/server-data-fetch"}
						className={styles.navLink}
					>
						Server Fetch
					</Link>
					<Link href={"/dashboard"} className={styles.navLink}>
						Dashboard
					</Link>
				</nav>
			</header>
		</>
	)
}
