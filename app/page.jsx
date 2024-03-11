import Image from "next/image"
import TravLogo from "@/public/TravLogo.png"
import heroImg from "@/public/hero-picture.png"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Link from "next/link"

export default function HomePage() {
	return (
		<main className="scroll-smooth p-4">
			<section className="w-fill h-dvh flex flex-col justify-center items-center">
				<div className="flex flex-col justify-center items-center gap-4">
					<Image
						src={TravLogo}
						width={600}
						sizes="(max-width: 430px), 600px "
						alt="Trav Logo"
					/>
					<Link href={"#about"}>
						<ExpandMoreIcon
							className="animate-bounce opacity-50"
							sx={{ color: "red", fontSize: "4rem" }}
						/>
					</Link>
				</div>
			</section>
			<section
				className="flex flex-col h-[800px] lg:grid grid-cols-2 items-center justify-center "
				id="about"
			>
				<section>
					{" "}
					<Image
						src={heroImg}
						width={600}
						sizes="(max-width: 430px), 600px "
						alt="Trav Logo"
					/>
				</section>
				<section className="flex flex-col">
					<h2 className="text-3xl my-4 font-semibold text-text-secondary opacity-70">
						about travis
					</h2>
					<p className="font-sans">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Sit veritatis sequi beatae iste deleniti iusto corrupti
						qui molestiae odio voluptatem saepe necessitatibus, aut
						veniam officiis ipsa non commodi aliquam doloribus.
					</p>
				</section>
			</section>
		</main>
	)
}
