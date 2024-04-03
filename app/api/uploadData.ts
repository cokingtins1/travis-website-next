import { getSession } from "@/libs/supabase/getSession";
import { returnArray } from "@/libs/utils";
import dayjs from "dayjs";
import { clearTempUploads } from '../actions/clearTempUploads';
import { clearZombieFiles } from '../actions/clearZombieFiles';

type ActionType = "insert" | "update" | "delete";

export async function uploadData(formData: FormData, action: ActionType) {
	const { supabase } = await getSession();

	if (!formData) return;

	if (action === "insert") {
		// Foreign Keys:
		const product_id = crypto.randomUUID();

		const pricing_id_mp3 = crypto.randomUUID();
		const pricing_id_wav = crypto.randomUUID();
		const pricing_id_zip = crypto.randomUUID();
		//Need pricing id for file...
		await supabase.from("products").insert({
			product_id: product_id,

			title: formData.get("title"),
			type: formData.get("type"),
			release_date: formData.get("releaseDate"),
			release_date_long: dayjs(
				formData.get("releaseDate") as string
			).format("MMMM D, YYYY "),
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
			file_url: formData.get("MP3_storage_url"),
			storage_key: formData.get("MP3_storage_key"),
			storage_name: formData.get("MP3_storage_name"),
			storage_size: formData.get("MP3_storage_size"),
		});

		await supabase.from("product_files").insert({
			product_id: product_id,
			pricing_id: pricing_id_wav,
			file_extension: ".wav",
			file_url: formData.get("WAV_storage_url"),
			storage_key: formData.get("WAV_storage_key"),
			storage_name: formData.get("WAV_storage_name"),
			storage_size: formData.get("WAV_storage_size"),
		});

		await supabase.from("product_files").insert({
			product_id: product_id,
			pricing_id: pricing_id_zip,
			file_extension: ".zip",
			file_url: formData.get("STEM_storage_url"),
			storage_key: formData.get("STEM_storage_key"),
			storage_name: formData.get("STEM_storage_name"),
			storage_size: formData.get("STEM_storage_size"),
		});
	}

	if (action === "update") {
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

		await supabase
			.from("product_files")
			.update({
				file_url: formData.get("MP3_storage_url"),
				storage_key: formData.get("MP3_storage_key"),
				storage_name: formData.get("MP3_storage_name"),
				storage_size: formData.get("MP3_storage_size"),
			})
			.eq("product_id", product_id)
			.eq("file_extension", ".mp3");

		await supabase
			.from("product_files")
			.update({
				file_url: formData.get("WAV_storage_url"),
				storage_key: formData.get("WAV_storage_key"),
				storage_name: formData.get("WAV_storage_name"),
				storage_size: formData.get("WAV_storage_size"),
			})
			.eq("product_id", product_id)
			.eq("file_extension", ".wav");

		await supabase
			.from("product_files")
			.update({
				file_url: formData.get("STEM_storage_url"),
				storage_key: formData.get("STEM_storage_key"),
				storage_name: formData.get("STEM_storage_name"),
				storage_size: formData.get("STEM_storage_size"),
			})
			.eq("product_id", product_id)
			.eq("file_extension", ".zip");

		//  update storage keys and delete zombie files (old storage records will no longer have a supabse DB record)
	}

	const deleteKeys = [
		formData.get("MP3_storage_key"),
		formData.get("WAV_storage_key"),
		formData.get("STEM_storage_key"),
		formData.get("image_storage_key"),
	];

    await clearTempUploads(deleteKeys as string[]);
	await clearZombieFiles();

	return;
}
