import beatKitImage from "@/public/beatKitImage.jpg"
import Link from "next/link"
import Image from "next/image"
import getPosts from "@/libs/getPosts"
import SearchComponent from "../components/SearchBar/SearchComponent"
import AddContentForm from "../components/Dashboard Components/AddContentForm/AddContentForm"

export default async function Page() {
	const postData = await getPosts()
	return (
		<>
			<div className=" flex justify-center">
				{/* <SearchComponent /> */}

				<AddContentForm />
				{/* <ul className="grid grid-cols-4 gap-4 minmax-12rem">
					{postData.map((post) => {
						return (
							<li key={post.id} className="flex flex-1 flex-col">
								<Link href={`/store/${post.id}`}>
									<Image
										src={beatKitImage}
										alt="product image"
									></Image>
								</Link>
								<p className="product-title">{post.title}</p>
								<p className="cost">{post.id}</p>
							</li>
						)
					})}
				</ul> */}
			</div>
		</>
	)
}
