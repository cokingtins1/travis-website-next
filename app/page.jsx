import Image from "next/image"
import TravLogo from "@/public/TravLogoBlue.png"
import heroImg from "@/public/heroImage.jpg"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Link from "next/link"
import FollowButtons from "./components/Checkout Component/FollowButtons"

export default function HomePage() {
	return (
		<main className="scroll-smooth p-4 ">
			<section className="w-fill h-dvh flex flex-col justify-center items-center">
				<div className="flex flex-col justify-center items-center gap-4">
					<Image
						priority={true}
						src={TravLogo}
						width={600}
						sizes="(max-width: 430px), 600px "
						alt="Trav Logo"
					/>
					<Link href={"#about"}>
						<ExpandMoreIcon
							className="animate-bounce opacity-50"
							sx={{ color: "#1976D2", fontSize: "4rem" }}
						/>
					</Link>
				</div>
			</section>
			<section
				className="flex flex-col h-[800px] lg:grid grid-cols-2 items-center justify-center mb-12"
				id="about"
			>
				<section>
					{" "}
					<Image
						src={heroImg}
						width={600}
						sizes="(max-width: 430px), 600px "
						alt="Trav Logo"
						style={{ borderRadius: "8px" }}
					/>
				</section>
				<section className="flex flex-col">
					<h2 className="text-3xl my-4 font-semibold text-text-secondary opacity-70">
						TRAV
					</h2>
					<p>
						trav (Travis) is a self-made beats producer from
						Columbus, OH. He has collaborated with dozens of artists
						and other producers, dropping hits with Lil Tecca{" "}
						<i>(Last Call)</i>, iann dior <i>(Take)</i>, BFB Da
						Packman, and others. Once a part of Internet Money, trav
						has had continued success with top artists accross the
						Rap, Trap, and Hip Hop genres. Check out his{" "}
						<Link className="underline" href={"/store"}>
							beats store
						</Link>
						&nbsp;or follow him social media below.
					</p>

					<FollowButtons text="Follow trav:" />
				</section>
			</section>
		</main>
	)
}
