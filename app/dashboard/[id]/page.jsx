import { useSession } from "@/libs/supabase/useSession"
import { notFound, redirect } from "next/navigation"
import FileEdit from "@/app/components/Dashboard Components/Edit Content/FileEdit"
import { getImageSrc } from "@/libs/supabase/supabaseQuery"
import InfoEdit from "@/app/components/Dashboard Components/Edit Content/InfoEdit"

export default async function Page({ params: { id } }) {
	const { session, supabase } = await useSession()

	if (!session) {
		redirect("/login")
	}

	const { data: product } = await supabase
		.from("products")
		.select("*")
		.match({ id })
		.single()

	if (!product) {
		notFound()
	}

	const { data: [MP3_file] = [] } = await supabase.storage
		.from("all_products")
		.list(`${product.upload_id}/MP3_file`, {
			limit: 1,
			offset: 0,
		})

	const { data: [WAV_file] = [] } = await supabase.storage
		.from("all_products")
		.list(`${product.upload_id}/WAV_file`, {
			limit: 1,
			offset: 0,
		})

	const { data: [STEM_file] = [] } = await supabase.storage
		.from("all_products")
		.list(`${product.upload_id}/STEM_file`, {
			limit: 1,
			offset: 0,
		})

	const productImage = await getImageSrc(product.upload_id)

	const productFiles = { MP3_file, WAV_file, STEM_file, productImage }

	return (
		<>
			<main>
				<InfoEdit product={product} productFiles={productFiles} />
			</main>
		</>
	)
}
