"use server";

import { revalidateTag } from "next/cache";

export default async function revalidate(tagsToRevalidate: string[]) {
	tagsToRevalidate.forEach((tag) => revalidateTag(tag));
}
