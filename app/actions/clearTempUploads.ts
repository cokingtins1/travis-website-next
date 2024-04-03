import { tempFileIntoSupabase } from "./tempFileIntoSupabase";

export async function clearTempUploads(deleteKeys: string[]) {
	const keysEmpty = deleteKeys.every((value) => value === null);
	const fileObj = { deleteKeys: deleteKeys };
	if (!keysEmpty) {
		await tempFileIntoSupabase(fileObj, "clearTemp");
	}

	return;
}
