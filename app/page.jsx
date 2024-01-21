import styles from "@/app/styles.module.css"
import Image from "next/image"
import heroImg from "../public/hero-picture.png"

export default function HomePage() {
	return (
		<main className={styles.main}>
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
