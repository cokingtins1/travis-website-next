"use server";

import { getSession } from "@/libs/supabase/getSession";
import { utapi } from "./server/uploadthing";

export async function clearOrphanedFiles() {
	const { supabase } = await getSession();

	const { data: existingKeys } = await supabase
		.from("product_files")
		.select("storage_key");

	const { data: imageKeys } = await supabase
		.from("products")
		.select("image_storage_key");

	const existingFilesInStorage = await utapi.listFiles();

	const existingImageKeys = imageKeys.map((item) => item.image_storage_key);

	const existingKeysInDB = existingKeys.map((item) => item.storage_key);
	existingKeysInDB.push(...existingImageKeys);

	const ghostKeys = existingFilesInStorage.reduce(
		(accumulator, currentItem) => {
			if (!existingKeysInDB.includes(currentItem.key)) {
				accumulator.push(currentItem.key);
			}
			return accumulator;
		},
		[]
	);

	if (ghostKeys.length > 0) {
		for (const key of ghostKeys) {
			await utapi.deleteFiles(key);
		}
	}

	return;
}
