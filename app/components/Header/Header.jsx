import styles from "./styles.module.css"
import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Link from "next/link"
import Image from "next/image"
import logoImg from "@/public/Logo.png"
import SearchComponent from "../SearchBar/SearchComponent"

const headerHeight = '300px'

export default function Header() {
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
					<SearchComponent />
					<div className={styles.adminButtons}>
						<Link href={"/login"}>
							<button className={styles.iconBtn}>
								<AccountCircle />
								<label className={styles.label} htmlFor="">
									Login
								</label>
							</button>
						</Link>
						<button className={styles.iconBtn}>
							<ShoppingCartIcon />
							<label className={styles.label}>Cart</label>
						</button>
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
					<Link href={"/dashboard"} className={styles.navLink}>
						Dashboard
					</Link>
				</nav>
			</header>
		</>
	)
}
