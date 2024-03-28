import { FileEsque } from "uploadthing/types";
import { utapi } from "../server/uploadthing";
import Link from "next/link";

export default async function Page() {
	// const oneUrl = await utapi.getFileUrls(
	// 	"0e0a76a0-3843-4aa2-b85f-678876b62de1-sy5hvy.mp3"
	// );

	const filesFromStorage = await utapi.listFiles();

	async function getFilesFromStorage(formData: FormData) {
		"use server";
		const fileKey = formData.get("key");
		const url = await utapi.getSignedURL(fileKey as string, {
			expiresIn: 60 * 60, // 1 hour
			// expiresIn: '1 hour',
			// expiresIn: '3d',
			// expiresIn: '7 days',
		});
		console.log(url);
		return url;
	}

	// console.log(filesFromStorage);

	async function uploadFiles(formData: FormData) {
		"use server";
		const files = formData.getAll("files");
		const filesWithCustomId = (files as FileEsque[]).map((file) => {
			if (!file.customId) {
				file.customId = crypto.randomUUID();
			}
			return file;
		});

		const response = await utapi.uploadFiles(filesWithCustomId, {
			metadata: { id: "12345" },
			contentDisposition: "attachment",
		});

		console.log(response);
	}
	let signedurl: string;

	async function getSignedURL(formData: FormData) {
		"use server";
		const fileKey = formData.get("key");
		const url = await utapi.getSignedURL(fileKey as string, {
			expiresIn: 60 * 60, // 1 hour
			// expiresIn: '1 hour',
			// expiresIn: '3d',
			// expiresIn: '7 days',
		});
		console.log(url);
		return url;
	}

	return (
		<div className="flex flex-col items-center gap-8">
			<form action={uploadFiles}>
				<input name="files" type="file" multiple />
				<button type="submit">Upload</button>
			</form>

			<form action={getSignedURL}>
				<label htmlFor="">File Key</label>
				<input className="text-black w-full" name="key" type="text" />
				<button type="submit">Get Link</button>
			</form>

			{signedurl && <Link href={signedurl}>{signedurl}</Link>}
			<ul>
				{/* {filesFromStorage &&
					filesFromStorage.map((file, index) => (
						<li key={index}>
							<p>Name: {file.name}</p>
							<p>Key: {file.key}</p>
							<p>CustomId: {file.customId}</p>
						</li>
					))} */}
			</ul>
		</div>
	);
}
