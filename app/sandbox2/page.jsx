import supabaseClient from "@/libs/supabase/config/supabaseClient"

export default async function Page() {
	const product_id = "1cae68bc-7713-46d3-966b-84124144eef7"
	const productFileURL =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products"

	const product = {
		title: "Test Upload",
		bpm: 420,
	}

	const { data: fileArray } = await supabaseClient.storage
		.from(`all_products`)
		.list(`${product_id}`, {
			offset: 0,
		})

	const audio_mp3 = fileArray.some((file) => file.name === "MP3")
		? `${product_id}/MP3/${product.title} ${product.bpm} BPM-@trav-MP3`
		: ""

	const audio_wav = fileArray.some((file) => file.name === "WAV")
		? `${product_id}/WAV/${product.title} ${product.bpm} BPM-@trav-WAV`
		: ""

	const audio_stem = fileArray.some((file) => file.name === "STEM")
		? `${product_id}/STEM/`
		: ""

	const { data: file } = await supabaseClient.storage
		.from(`all_products`)
		.getPublicUrl(audio_mp3)

	const { data: files } = await supabaseClient.storage
		.from(`all_products`)
		.list(`${product_id}/MP3`)

	return <div>Hi</div>
}
