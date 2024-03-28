import supabaseServer from "@/libs/supabase/supabaseServer";
import { useSession } from "@/libs/supabase/useSession";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { revalidatePath, revalidateTag } from "next/cache";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	// imageUploader: f({ image: { maxFileSize: "4MB" } })
	mp3Uploader: f({
		"audio/mpeg": {
			maxFileSize: "128MB",
			contentDisposition: "inline",
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const { id } = await useSession();

			// If you throw, the user will not be able to upload
			if (!id) throw new UploadThingError("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: id, message: "hello" };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);
			const { supabase } = await useSession();

			await supabase.from("temp_uploads").insert({
				upload_id: file.key,
				file_type: file.type,
				url: file.url,
			});
			// revalidateTag("temp_uploads");
			revalidatePath("/dashboard/add-content");

			console.log("file url", file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
	wavUploader: f({
		"audio/x-wav": {
			maxFileSize: "128MB",
			contentDisposition: "attachment",
		},
	})
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const { id } = await useSession();

			// If you throw, the user will not be able to upload
			if (!id) throw new UploadThingError("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: id, message: "hello" };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);
			const { supabase } = await useSession();

			await supabase
				.from("temp_uploads")
				.insert({ id: file.key })
				.then((res) => console.log(res));

			console.log("file url", file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),

	stemUploader: f({
		"application/zip": {
			maxFileSize: "1GB",
			contentDisposition: "attachment",
		},
	})
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			const { id } = await useSession();

			// If you throw, the user will not be able to upload
			if (!id) throw new UploadThingError("Unauthorized");

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: id, message: "hello" };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);

			console.log("file url", file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
