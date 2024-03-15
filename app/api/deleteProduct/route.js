import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { useSession } from '@/libs/supabase/useSession'

export async function DELETE(req) {

	const {supabase} = useSession()

	const product_id = await req.json()

	if (product_id) {
		console.log(`deleting ${product_id}`)

		// Delete data from DB
		try {
			const { error } = await supabase
				.from("products")
				.delete()
				.eq("id", product_id)

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

			const filesToRemove = productFiles
				.filter((file) => file.name !== "productImage")
				.map((file) => file.name)

			const { data: imageFiles } = await supabase.storage
				.from("all_products")
				.list(`${product_id}/productImage`)

			const imagesToRemove = imageFiles.map((file) => file.name)

			if (filesToRemove) {
				for (const file in filesToRemove) {
					const path = `${product_id}/${filesToRemove[file]}`

					await supabase.storage.from("all_products").remove(path)
				}
			}

			if (imagesToRemove) {
				for (const file in imagesToRemove) {
					const path = `${product_id}/productImage/${imagesToRemove[file]}`
					await supabase.storage.from("all_products").remove(path)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	revalidatePath("/")

	return NextResponse.json(
		{ message: "Product deleted successfully" },
		{ status: 200 }
	)
}
