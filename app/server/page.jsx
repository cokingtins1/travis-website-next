import { writeFile } from "fs/promises"
import { join } from "path"

export default function ServerUploadPage() {
	async function upload(data) {
        "use server"
		const file = data.get("file")

		if (!file) {
			throw new Error("No file uploaded")
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const path = join("/", "tmp", file.name)
		await writeFile(path, buffer)
		console.log(`open ${path} to see the uploaded file`)

		return { success: true }
	}
	return (
		<main className='flex justify-center mt-12'>
			<form action={upload}>
				<input type="file" name="file" />
				<input type="submit" name="submit" />
			</form>
		</main>
	)
}
