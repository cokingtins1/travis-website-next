"use server";

import { utapi } from "../server/uploadthing";
export async function deleteFileFromStorage(fileKey: string) {
	await utapi.deleteFiles(fileKey);

	return;
}
