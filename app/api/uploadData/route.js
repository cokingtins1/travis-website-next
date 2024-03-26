import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { returnArray } from "@/libs/utils";
import { revalidatePath } from "next/cache";
import { useSession } from "@/libs/supabase/useSession";
import { getFileSources, getProductById } from "@/libs/supabase/supabaseQuery";
import { revalidateTag } from "next/cache";

export async function POST(req) {
	const { supabase } = await useSession();

	const formData = await req.formData();

	if (!formData) {
		return NextResponse.json(
			{ message: "Missing form data" },
			{ status: 400 }
		);
	}

	async function uploadFile(path, file) {
		try {
			const { error } = await supabase.storage
				.from("all_products")
				.upload(path, file);

			if (error) {
				throw error;
			}
		} catch (error) {
			console.log(error);
		}
	}

	// Foreign Keys:
	const product_id = crypto.randomUUID();

	const pricing_id_mp3 = crypto.randomUUID();
	const pricing_id_wav = crypto.randomUUID();
	const pricing_id_zip = crypto.randomUUID();

	// Storage Foreign Keys:

	const file_url_mp3 = `${product_id}/MP3/${formData.get(
		"title"
	)} ${formData.get("bpm")} BPM-@trav-MP3`;
	const file_url_wav = `${product_id}/WAV/${formData.get(
		"title"
	)} ${formData.get("bpm")} BPM-@trav-WAV`;
	const file_url_zip = `${product_id}/STEM/${formData.get(
		"title"
	)} ${formData.get("bpm")} BPM-@trav-STEM`;

	let image_url;
	for (const e of formData) {
		const value = e[1];
		if (value instanceof File) {
			if (value.type.split("/")[0] == "image") {
				image_url = `${product_id}/productImage/${value.name}`;
				break;
			}
		}
	}

	await supabase.from("products").insert({
		product_id: product_id,

		title: formData.get("title"),
		type: formData.get("type"),
		release_date: formData.get("releaseDate"),
		release_date_long: dayjs(formData.get("releaseDate")).format(
			"MMMM D, YYYY "
		),
		description: formData.get("description"),
		tags: returnArray("tags", formData),
		genres: returnArray("genres", formData),
		moods: returnArray("moods", formData),
		instruments: returnArray("instruments", formData),
		keys: formData.get("keys"),
		bpm: formData.get("bpm"),
		video_link: formData.get("videoLink"),
		image_name: "",
		free: formData.get("free"),
		plays: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
	});

	await supabase.from("pricing").insert({
		pricing_id: pricing_id_mp3,
		product_id: product_id,
		type_id: "basic",
		is_active: formData.get("basic"),
		price: formData.get("basicPrice"),
	});

	await supabase.from("pricing").insert({
		pricing_id: pricing_id_wav,
		product_id: product_id,
		type_id: "premium",
		is_active: formData.get("premium"),
		price: formData.get("premiumPrice"),
	});

	await supabase.from("pricing").insert({
		pricing_id: pricing_id_zip,
		product_id: product_id,
		type_id: "exclusive",
		is_active: formData.get("exclusive"),
		price: formData.get("exclusivePrice"),
	});

	await supabase.from("product_likes").insert({
		product_id: product_id,
		likes: 0,
		liked_by_id: [],
		liked_by_email: [],
	});

	for (const e of formData) {
		const value = e[1];

		if (value instanceof File) {
			// catch STEM files for now. Will upgrade to pro soon.

			if (value.type.split("/")[0] == "image") {
				await uploadFile(image_url, value);
			} else if (value.name.endsWith(".mp3")) {
				await uploadFile(file_url_mp3, value);
			} else if (value.name.endsWith(".wav")) {
				await uploadFile(file_url_wav, value);
			} else if (value.name.endsWith(".zip")) {
				await uploadFile(file_url_zip, value);
			}
		}
	}

	const { audioSrc_MP3, audioSrc_WAV, audioSrc_STEM, imageSrc } =
		await getFileSources(product_id);

	await supabase.from("product_files").insert({
		product_id: product_id,
		pricing_id: pricing_id_mp3,
		file_extension: ".mp3",
		file_url: audioSrc_MP3,
	});

	await supabase.from("product_files").insert({
		product_id: product_id,
		pricing_id: pricing_id_wav,
		file_extension: ".wav",
		file_url: audioSrc_WAV,
	});

	await supabase.from("product_files").insert({
		product_id: product_id,
		pricing_id: pricing_id_zip,
		file_extension: ".zip",
		file_url: audioSrc_STEM,
	});

	await supabase
		.from("products")
		.update({
			image_name: imageSrc,
		})
		.eq("product_id", product_id);

	revalidateTag("products");
	revalidateTag("dashboardData");
	// Check supabase to see if data was uploaded
	const data = await getProductById(product_id);

	if (data && (audioSrc_MP3 || audioSrc_WAV || audioSrc_STEM)) {
		revalidatePath("/", "layout");

		return NextResponse.json(
			{ message: "Product was uploaded susccessfully" },
			{ status: 201 }
		);
	} else if (!data && (audioSrc_MP3 || audioSrc_WAV || audioSrc_STEM)) {
		return NextResponse.json(
			{ message: "Error uploading product data" },
			{ status: 500 }
		);
	} else if (data && (!audioSrc_MP3 || !audioSrc_WAV || !audioSrc_STEM)) {
		return NextResponse.json(
			{ message: "Error uploading product files" },
			{ status: 500 }
		);
	}
}
