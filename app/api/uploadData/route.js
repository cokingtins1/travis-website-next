import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { returnArray } from "@/libs/utils";
import { revalidatePath } from "next/cache";
import { getSession } from "@/libs/supabase/getSession";
import { getProductById } from "@/libs/supabase/supabaseQuery";
import { revalidateTag } from "next/cache";
import { clearTempUploads } from "@/app/actions/clearTempUploads";
import { clearZombieFiles } from "@/app/actions/clearZombieFiles";

export async function POST(req) {
	const { supabase } = await getSession();

	const formData = await req.formData();

	if (!formData) {
		return NextResponse.json(
			{ message: "Missing form data" },
			{ status: 400 }
		);
	}

	// Foreign Keys:
	const product_id = crypto.randomUUID();

	const pricing_id_mp3 = crypto.randomUUID();
	const pricing_id_wav = crypto.randomUUID();
	const pricing_id_zip = crypto.randomUUID();

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
		free: formData.get("free"),
		plays: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
		image_url: formData.get("image_storage_url"),
		image_name: formData.get("image_storage_url"),
		image_storage_key: formData.get("image_storage_key"),
		image_storage_name: formData.get("image_storage_name"),
		image_storage_size: formData.get("image_storage_size"),
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

	await supabase.from("product_files").insert({
		product_id: product_id,
		pricing_id: pricing_id_mp3,
		file_extension: ".mp3",
		file_url:
			formData.get("MP3_storage_url") === "null"
				? null
				: formData.get("MP3_storage_url"),
		storage_key:
			formData.get("MP3_storage_key") === "null"
				? null
				: formData.get("MP3_storage_key"),
		storage_name:
			formData.get("MP3_storage_name") === "null"
				? null
				: formData.get("MP3_storage_name"),
		storage_size:
			formData.get("MP3_storage_size") === "null"
				? null
				: formData.get("MP3_storage_size"),
	});

	await supabase.from("product_files").insert({
		product_id: product_id,
		pricing_id: pricing_id_wav,
		file_extension: ".wav",
		file_url:
			formData.get("WAV_storage_url") === "null"
				? null
				: formData.get("WAV_storage_url"),
		storage_key:
			formData.get("WAV_storage_key") === "null"
				? null
				: formData.get("WAV_storage_key"),
		storage_name:
			formData.get("WAV_storage_name") === "null"
				? null
				: formData.get("WAV_storage_name"),
		storage_size:
			formData.get("WAV_storage_size") === "null"
				? null
				: formData.get("WAV_storage_size"),
	});

	await supabase.from("product_files").insert({
		product_id: product_id,
		pricing_id: pricing_id_zip,
		file_extension: ".zip",
		file_url:
			formData.get("STEM_storage_url") === "null"
				? null
				: formData.get("STEM_storage_url"),
		storage_key:
			formData.get("STEM_storage_key") === "null"
				? null
				: formData.get("STEM_storage_key"),
		storage_name:
			formData.get("STEM_storage_name") === "null"
				? null
				: formData.get("STEM_storage_name"),
		storage_size:
			formData.get("STEM_storage_size") === "null"
				? null
				: formData.get("STEM_storage_size"),
	});

	const deleteKeys = [
		formData.get("MP3_storage_key"),
		formData.get("WAV_storage_key"),
		formData.get("STEM_storage_key"),
		formData.get("image_storage_key"),
	];

	await clearTempUploads(deleteKeys);
	await clearZombieFiles();

	revalidateTag("products");
	revalidateTag("dashboardData");
	// Check supabase to see if data was uploaded
	// const { storeSrc } = await getAudioSrc(product_id);

	const data = await getProductById(product_id);

	if (data) {
		revalidatePath("/", "layout");

		return NextResponse.json(
			{ message: "Product was uploaded susccessfully" },
			{ status: 201 }
		);
	} else if (!data) {
		return NextResponse.json(
			{ message: "Error uploading product data" },
			{ status: 500 }
		);
	}
}
