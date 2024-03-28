import { utapi } from "../server/uploadthing";
import { unstable_cache } from "next/cache";

export const getStorageItems = unstable_cache(
	async () => {
		const files = await utapi.listFiles();

		return files;
	},
	["storageItems"],
	{ tags: ["storageItems"] }
);
