import styles from "./styles.module.css"
import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IosShareIcon from "@mui/icons-material/IosShare"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export default function ProductMeta({product}) {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.imageCont}>
					<Image
						src={beatKitImage}
						alt="product image"
						style={{ borderRadius: ".5rem" }}
					></Image>
				</div>
				<h1 className="text-2xl text-center">
					{product.productName}
				</h1>

				<div className={styles.iconCont}>
					<button></button>

					<IconButton >
						<FavoriteBorderIcon />
					</IconButton>
					<IconButton>
						<IosShareIcon />
					</IconButton>
					<IconButton>
						<ShoppingCartIcon />
					</IconButton>
				</div>

				<Divider />
				<div className={styles.productInfo}>
					<h3 className="text-sm">INFORMATION</h3>
					<p>
						<span>Published</span>
						<span>December 28, 2023</span>
					</p>
					<p>
						<span>BPM</span>
						<span>69</span>
					</p>
					<p>
						<span>Plays</span>
						<span>420</span>
					</p>
				</div>

				<Divider />
				<div className={styles.productAbout}>
					<h3 className="text-sm">ABOUT</h3>
					<p>
						<span>
							Disco pop type beat | Funky dance pop type beat
						</span>
					</p>
				</div>
				<Divider />
			</div>
		</>
	)
}
