"use server";

import { getSession } from "@/libs/supabase/getSession";
import { utapi } from "./server/uploadthing";

type FileProps = {
	key?: string;
	type?: string;
	url?: string;
	size?: number;
	deleteKeys?: string[];
};

type Operation = "insert" | "delete" | "abort" | "clearTemp";

export async function tempFileIntoSupabase(
	file: FileProps,
	operation: Operation
) {
	const { supabase } = await getSession();

	if (operation === "insert") {
		await supabase.from("temp_uploads").insert({
			upload_id: file.key,
			file_type: file.type,
			file_url: file.url,
			file_size: file.size,
		});
	} else if (operation === "delete") {
		await supabase.from("temp_uploads").delete().eq("upload_id", file.key);

		await utapi.deleteFiles(file.key);
	} else if (operation === "abort" || operation === "clearTemp") {
		for (const key of file.deleteKeys) {
			if (key)
				await supabase
					.from("temp_uploads")
					.delete()
					.eq("upload_id", key);
			if (operation === "abort") {
				await utapi.deleteFiles(key);
			}
		}
	}

	return;
}
