import { returnArray } from "@/libs/utils";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSession } from "@/libs/supabase/getSession";
import { clearTempUploads } from "@/app/actions/clearTempUploads";
import { clearOrphanedFiles } from "@/app/actions/clearOrphanedFiles";

export async function PUT(req) {
	const { supabase } = await getSession();

	const formData = await req.formData();

	if (!formData) {
		return NextResponse.json(
			{ message: "Missing form data" },
			{ status: 400 }
		);
	}

	try {
		const product_id = formData.get("product_id");

		await supabase
			.from("products")
			.update({
				title: formData.get("title"),
				type: formData.get("type"),
				description: formData.get("description"),
				tags: returnArray("tags", formData),
				genres: returnArray("genres", formData),
				moods: returnArray("moods", formData),
				instruments: returnArray("instruments", formData),
				keys: formData.get("keys"),
				bpm: formData.get("bpm") === "" ? 0 : formData.get("bpm"),
				video_link: formData.get("videoLink"),
				free: formData.get("free"),

				image_url: formData.get("image_storage_url"),
				image_name: formData.get("image_storage_url"),
				image_storage_key: formData.get("image_storage_key"),
				image_storage_name: formData.get("image_storage_name"),
				image_storage_size: formData.get("image_storage_size"),
			})
			.eq("product_id", product_id)
			.then((res) => {
				if (res.error) {
					console.log(res.error.message);
				} else {
					console.log("update successfull");
				}
			});

		await supabase
			.from("pricing")
			.update({
				is_active: false,
				price: formData.get("basicPrice"),
			})
			.eq("product_id", product_id)
			.eq("type_id", "basic");

		await supabase
			.from("pricing")
			.update({
				is_active: formData.get("premium"),
				price: formData.get("premiumPrice"),
			})
			.eq("product_id", product_id)
			.eq("type_id", "premium");

		await supabase
			.from("pricing")
			.update({
				is_active: formData.get("exclusive"),
				price: formData.get("exclusivePrice"),
			})
			.eq("product_id", product_id)
			.eq("type_id", "exclusive");

		await supabase
			.from("product_files")
			.update({
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
			})
			.eq("product_id", product_id)
			.eq("file_extension", ".mp3");

		await supabase
			.from("product_files")
			.update({
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
			})
			.eq("product_id", product_id)
			.eq("file_extension", ".wav");

		await supabase
			.from("product_files")
			.update({
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
			})
			.eq("product_id", product_id)
			.eq("file_extension", ".zip");

		const deleteKeys = [
			formData.get("MP3_storage_key"),
			formData.get("WAV_storage_key"),
			formData.get("STEM_storage_key"),
			formData.get("image_storage_key"),
		];

		await clearTempUploads(deleteKeys);
		await clearOrphanedFiles();
	} catch (error) {
		console.log(error);
	}

	revalidateTag("products");
	revalidateTag("dashboardData");
	revalidatePath("/");

	return NextResponse.json(
		{ message: "Fields updated successfully" },
		{ status: 200 }
	);
}
