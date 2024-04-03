import { getSession } from "@/libs/supabase/getSession";
import { notFound, redirect } from "next/navigation";
import {
	getFileSources,
	getPricingById,
	getPricingIdById,
} from "@/libs/supabase/supabaseQuery";
import InfoEdit from "@/app/components/Dashboard Components/Edit Content/InfoEdit";

import { getAudioSrc } from "@/libs/supabase/getAudioSrc";

export default async function Page({ params: { id } }) {
	const { session, supabase } = await getSession();

	if (!session) {
		redirect("/login");
	}

	const productFilePaths = await getPricingIdById(id);

	const pricing = await getPricingById(id);

	if (!productFilePaths) {
		notFound();
	}

	const { data: product } = await supabase
		.from("products")
		.select("*")
		.match({ product_id: id })
		.single();

	const { fileDataObject } = await getAudioSrc(product);

	// console.log(fileDataObject);

	const audioSources = {
		MP3: fileDataObject.basic?.file_url,
		WAV: fileDataObject.premium?.file_url,
		STEM: fileDataObject.exclusive?.file_url,
	};

	// console.log(audioSources);

	return (
		<>
			<main>
				<InfoEdit
					product={product}
					productFiles={fileDataObject}
					pricing={pricing.pricingShort}
					audioSources={audioSources}
				/>
			</main>
		</>
	);
}
