import logoImg from "@/app/pulbic/Logo.png"
import Image from "next/image"
import styles from "./styles.module.css"
import AccountCircle from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export default function Header() {
	return (
		<>
			<header className="p-4">
				<div className={styles.headerWrapper}>
					<Image
						src={logoImg}
						alt="logo"
						style={{ maxWidth: "168px" }}
					/>
					<input
						type="text"
						className="border border-slate-500"
						style={{ maxWidth: "100px", maxHeight: "30px" }}
					/>
					<div className={styles.adminButtons}>
						<button className={styles.iconBtn}>
							<AccountCircle />
							<label className={styles.label} htmlFor="">
								Login
							</label>
						</button>
						<button className={styles.iconBtn}>
							<ShoppingCartIcon />
							<label className={styles.label}>Cart</label>
						</button>
					</div>
				</div>
			</header>
		</>
	)
}
