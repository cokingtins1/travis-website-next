import styles from "@/app/styles/styles.module.css"
import Image from "next/image"
import Link from "next/link"
import heroImg from "@/app/public/hero-picture.png"
import logoImg from "@/app/public/Logo.png"

export default function HomePage() {
	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<Image
					src={logoImg}
					className={styles.logoImg}
					width={200}
					alt="logo"
				></Image>
				<Link className='text-lg font-bold' href={"/store"}>Store</Link>
			</div>
			<div className={styles.heroSection}>
				<div className={styles.heroImgContainer}>
					<div className={styles.heroRing}>
						<Image
							src={heroImg}
							className={styles.heroImg}
							width={600}
							style={{
								maxWidth: "100%",
								height: "auto",
							}}
							alt="pic"
						></Image>
					</div>
				</div>
			</div>
		</main>
	)
}
