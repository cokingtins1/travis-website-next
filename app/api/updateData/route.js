import { returnArray } from "@/libs/utils";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getFileSources } from "@/libs/supabase/supabaseQuery";
import { useSession } from "@/libs/supabase/useSession";

export async function PUT(req) {
	const formData = await req.formData();
	const product_id = await formData.get("product_id");
	const env = process.env.NODE_ENV;

	const { supabase } = await useSession();

	const {
		audioFile_MP3: currentMP3,
		audioFile_WAV: currentWAV,
		audioFile_STEM: currentSTEM,
		imageFile: currentImage,
	} = await getFileSources(product_id);

	// For deleting file purposes only
	const existing_path_mp3 = `${product_id}/MP3/${currentMP3?.name}`;
	const existing_path_wav = `${product_id}/WAV/${currentWAV?.name}`;
	const existing_path_stem = `${product_id}/STEM/${currentSTEM?.name}`;
	//-------------------

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

	async function modifyStorageNEW(
		currentFilePath,
		newFilePath,
		newFile,
		update,
		deleteFlag
	) {
		if (update === "true" && newFile) {
			if (newFile.type === "image/jpeg" || newFile.type === "image/png") {
				try {
					const { error: removeError } = await supabase.storage
						.from("all_products")
						.remove(currentFilePath);
					const { error: uploadError } = await supabase.storage
						.from("all_products")
						.upload(newFilePath, newFile);
					if (removeError || uploadError) {
						throw removeError || uploadError;
					}
				} catch (error) {
					console.log(error);
				}
			}

			try {
				const { error: removeError } = await supabase.storage
					.from("all_products")
					.remove(currentFilePath);
				const { error: uploadError } = await supabase.storage
					.from("all_products")
					.upload(newFilePath, newFile);
				if (removeError || uploadError) {
					throw removeError || uploadError;
				}
			} catch (error) {
				console.log(error);
			}
		} else if (update === "false" && newFile) {
			try {
				const { error } = await supabase.storage
					.from("all_products")
					.upload(newFilePath, newFile);
				if (error) {
					throw error;
				}
			} catch (error) {
				console.log(error);
			}
		} else if (deleteFlag === "true") {
			try {
				const { error } = await supabase.storage
					.from("all_products")
					.remove(currentFilePath);
				if (error) {
					throw error;
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function updateFileUrls(file_url) {
		let publicUrl;

		const { data } = supabase.storage
			.from(`all_products`)
			.getPublicUrl(file_url);
		publicUrl = data.publicUrl;

		await supabase
			.from("product_files")
			.update({
				file_url: publicUrl,
			})
			.eq("product_id", product_id)
			.then((res) => {
				if (res.error) {
					console.log(res.error.message);
				} else {
					console.log("update successfull");
				}
			});
	}

	if (!formData) return;

	try {
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
			})
			.eq("product_id", product_id)
			.then((res) => {
				if (res.error) {
					console.log(res.error.message);
				} else {
					console.log("update successfull");
				}
			});
	} catch (error) {
		console.log(error);
	}

	try {
		await supabase
			.from("pricing")
			.update({
				is_active: formData.get("basic"),
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

		// Deleting files
		if (formData.get("basicFileDelete") === "true") {
			await modifyStorageNEW(existing_path_mp3, null, null, null, "true");
		}
		if (formData.get("premiumFileDelete") === "true") {
			await modifyStorageNEW(existing_path_wav, null, null, null, "true");
		}
		if (formData.get("exclusiveFileDelete") === "true") {
			await modifyStorageNEW(
				existing_path_stem,
				null,
				null,
				null,
				"true"
			);
		}

		// Inserting or updating files
		for (const e of formData) {
			const key = e[0];
			const value = e[1];

			if (value instanceof File && env === "development") {
				if (value.type.split("/")[0] == "image") {
					await modifyStorageNEW(
						`${product_id}/productImage/${currentImage.name}`,
						image_url,
						value,
						"true",
						"false"
					);
				} else if (value.name.endsWith(".mp3")) {
					await modifyStorageNEW(
						`${product_id}/MP3/${currentMP3?.name}`,
						file_url_mp3,
						value,
						formData.get("MP3_update"),
						formData.get("basicFileDelete")
					);
					await updateFileUrls(file_url_mp3);
				} else if (value.name.endsWith(".wav")) {
					await modifyStorageNEW(
						`${product_id}/WAV/${currentWAV?.name}`,
						file_url_wav,
						value,
						formData.get("WAV_update"),
						formData.get("basicFileDelete")
					);
					await updateFileUrls(file_url_wav);
				} else if (value.name.endsWith(".zip")) {
					await modifyStorageNEW(
						`${product_id}/STEM/${currentSTEM?.name}`,
						file_url_zip,
						value,
						formData.get("STEM_update"),
						formData.get("basicFileDelete")
					);
					await updateFileUrls(file_url_zip);
				}
			}
		}
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
