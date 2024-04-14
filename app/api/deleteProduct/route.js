import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSession } from "@/libs/supabase/getSession";

import { clearOrphanedFiles } from "@/app/actions/clearOrphanedFiles";

export async function DELETE(req) {
	const { supabase } = await getSession();

	const product_id = await req.json();

	if (product_id) {
		// Delete data from DB
		try {
			const { error } = await supabase
				.from("products")
				.delete()
				.eq("product_id", product_id);

			if (error) {
				throw error;
			}
		} catch (error) {
			console.log(error);
		}

		// Delete files from storage
		await clearOrphanedFiles();
	}

	revalidatePath("/", "layout");

	return NextResponse.json(
		{ message: "Product deleted successfully" },
		{ status: 200 }
	);
}
