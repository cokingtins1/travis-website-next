"use server";

import { getSession } from "@/libs/supabase/getSession";
import { utapi } from "../server/uploadthing";

type Operation = "insert" | "delete" | "abort" | "clearTemp";

export async function tempEditIntoSupabase(
	file: string[],
	product_id: string,
	operation: Operation
) {
	const { supabase } = await getSession();

	if (operation === "abort") {
		await supabase.from("temp_edits").delete().neq("upload_id", 0);
		return;
	}

	await supabase.from("temp_edits").delete().neq("upload_id", 0);

	const { data: product_title } = await supabase
		.from("products")
		.select("title")
		.eq("product_id", product_id);

	const existingProductFiles = await utapi.listFiles();

	const temp_edit_files = existingProductFiles.filter((item) =>
		file.includes(item.key)
	);

	for (const file of temp_edit_files) {
		await supabase.from("temp_edits").insert({
			product_id: product_id,
			upload_id: file.id,
			product_title: product_title[0]?.title,
			file_key: file.key,
		});
	}

	// console.log(existingProductFiles);

	// if (operation === "insert") {
	// 	await supabase.from("temp_uploads").insert({
	// 		upload_id: file.key,
	// 		file_type: file.type,
	// 		file_url: file.url,
	// 		file_size: file.size,
	// 	});
	// } else if (operation === "delete") {
	// 	await supabase.from("temp_uploads").delete().eq("upload_id", file.key);

	// 	await utapi.deleteFiles(file.key);
	// } else if (operation === "abort" || operation === "clearTemp") {
	// 	for (const key of file.deleteKeys) {
	// 		if (key)
	// 			await supabase
	// 				.from("temp_uploads")
	// 				.delete()
	// 				.eq("upload_id", key);
	// 		if (operation === "abort") {
	// 			await utapi.deleteFiles(key);
	// 		}
	// 	}
	// }

	return;
}
