import { useSession } from "@/libs/supabase/useSession"
import { notFound, redirect } from "next/navigation"
import {
	getAudioSrcById,
	getImageSrc,
	getPricingById,
	getPricingIdById,
} from "@/libs/supabase/supabaseQuery"
import InfoEdit from "@/app/components/Dashboard Components/Edit Content/InfoEdit"

export default async function Page({ params: { id } }) {
	const { session, supabase } = await useSession()

	if (!session) {
		redirect("/login")
	}

	const productFilePaths = await getPricingIdById(id)

	const productImage = await getImageSrc(id)
	const pricing = await getPricingById(id)

	if (!productFilePaths) {
		notFound()
	}
	const [MP3_file_id, WAV_file_id, STEM_file_id] = productFilePaths

	const { data: product } = await supabase
		.from("products")
		.select("*")
		.match({ id })
		.single()

	const { data: files } = await supabase.storage.from("all_products").list(id)

	function findFile(fileList, fileName) {
		return fileList.find((file) => file.name === fileName)
	}

	const MP3_file = findFile(files, MP3_file_id)
	const WAV_file = findFile(files, WAV_file_id)
	const STEM_file = findFile(files, STEM_file_id)

	const productFiles = { MP3_file, WAV_file, STEM_file, productImage }
	const { audioSrc_MP3, audioSrc_WAV, audioSrc_STEM } = await getAudioSrcById(
		id
	)

	const audioSources = {
		MP3: audioSrc_MP3,
		WAV: audioSrc_WAV,
		STEM: audioSrc_STEM,
	}

	return (
		<>
			<main>
				<InfoEdit
					product={product}
					productFiles={productFiles}
					pricing={pricing.pricingShort}
					audioSources={audioSources}
				/>
			</main>
		</>
	)
}
