import styles from './styles.module.css'
import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"


const context = new AudioContext

export default function Page() {
	return (
		<main className={styles.main}>
			<div className={styles.productImgCont}>
				<Image
					src={beatKitImage}
					alt="product image"
				></Image>
			</div>
			<div className={styles.productInfoCont}>
				<h1 className="text-3xl">
					Super Dope Beat - Vol. 1 - Drum Kit
				</h1>
				<h2 className=''> beatsbytrav</h2>
				<div className={styles.videoCont}>
					<Image
						src={beatKitImage}
						className={styles.video}
						alt="product image"
					></Image>
				</div>
				<div className={styles.video}></div>
				<p className={styles.description}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
					cum dolore magnam velit explicabo, ab veniam ratione, libero
					dolorum sunt aperiam amet iste architecto impedit numquam
					quasi voluptatum ducimus incidunt.
				</p>
				<div className={styles.features}>
					<strong>Features</strong>
					<ul>808's</ul>
					<ul>45 Hi Hats</ul>
					<ul>37 Kicks</ul>
					<ul>94 Snares</ul>
					<ul>32 Perc Loops</ul>
				</div>
			</div>
		</main>
	)
}
