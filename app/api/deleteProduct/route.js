import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { useSession } from "@/libs/supabase/useSession"

export async function DELETE(req) {
	const { supabase } = await useSession()

	const product_id = await req.json()

	if (product_id) {
		// Delete data from DB
		try {
			const { error } = await supabase
				.from("products")
				.delete()
				.eq("product_id", product_id)

			if (error) {
				throw error
			}
		} catch (error) {
			console.log(error)
		}

		// Delete files from storage
		try {
			const { data: productFiles } = await supabase.storage
				.from("all_products")
				.list(product_id)

			if (!productFiles) return

			const filesToRemove = productFiles.map((file) => file.name)

			if (filesToRemove) {
				for (const file in filesToRemove) {
					let fileName
					const folder = `${product_id}/${filesToRemove[file]}`

					const { data } = await supabase.storage
						.from("all_products")
						.list(folder)

					fileName = data[0].name

					await supabase.storage
						.from("all_products")
						.remove(`${folder}/${fileName}`)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	// revalidatePath("/")

	return NextResponse.json(
		{ message: "Product deleted successfully" },
		{ status: 200 }
	)
}
