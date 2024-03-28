"use server";

import { useSession } from "@/libs/supabase/useSession";
import { utapi } from "../server/uploadthing";

type FileProps = {
	key?: string;
	type?: string;
	url?: string;
};

type Operation = "insert" | "delete";

export async function tempFileIntoSupabase(
	file: FileProps,
	operation: Operation
) {
	const { supabase } = await useSession();

	if (operation === "insert") {
		await supabase.from("temp_uploads").insert({
			upload_id: file.key,
			file_type: file.type,
			url: file.url,
		});
	} else if (operation === "delete") {
		await supabase.from("temp_uploads").delete().eq("upload_id", file.key);

		await utapi.deleteFiles(file.key);
	}

	return;
}
