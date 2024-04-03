"use server";

import { utapi } from "../server/uploadthing";

export async function addCustomId(product_id: string) {
	const existingProductFiles = await utapi.listFiles();

	const unNamedFiles = existingProductFiles.filter(file => file.customId === null)

	const renameArray = unNamedFiles.map((file) => ({
		key: file.key,
		newName: product_id,
	}));

	await utapi.renameFiles(renameArray)

	return;
}
