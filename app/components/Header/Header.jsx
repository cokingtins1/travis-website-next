import logoImg from "@/app/public/Logo.png"
import Image from "next/image"
import styles from "./styles.module.css"
import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from "@mui/icons-material/Search"
import Link from "next/link"

export default function Header() {
	return (
		<>
			<header className="p-4">
				<div className={styles.headerWrapper}>
					<Image
						src={logoImg}
						alt="logo"
						className="flex justify-start"
						style={{ maxWidth: "168px" }}
					/>
					<div className={styles.searchBarWrapper}>
						<input
							type="text"
							placeholder="Search"
							className={styles.searchBar}
						/>
						<button className={styles.searchBtn}>
							<SearchIcon className={styles.searchIcon} />
						</button>
					</div>
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
				</nav>
			</header>
		</>
	)
}
