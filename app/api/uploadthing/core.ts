import { useSession } from "@/libs/supabase/useSession";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { tempFileIntoSupabase } from "@/app/actions/tempFileIntoSupabase";

const f = createUploadthing();

export const ourFileRouter = {
	mp3Uploader: f({
		"audio/mpeg": {
			maxFileSize: "128MB",
			contentDisposition: "inline",
		},
	})
		.middleware(async () => {
			const { id } = await useSession();

			if (!id) throw new UploadThingError("Unauthorized");

			return { userId: id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);

			await tempFileIntoSupabase(file, "insert");

			// return of below can be sent to client:
			return { uploadedBy: metadata.userId };
		}),
	wavUploader: f({
		"audio/x-wav": {
			maxFileSize: "128MB",
			contentDisposition: "attachment",
		},
	})
		.middleware(async () => {
			const { id } = await useSession();

			if (!id) throw new UploadThingError("Unauthorized");

			return { userId: id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);

			await tempFileIntoSupabase(file, "insert");

			// return of below can be sent to client:
			return { uploadedBy: metadata.userId };
		}),

	stemUploader: f({
		"application/zip": {
			maxFileSize: "1GB",
			contentDisposition: "attachment",
		},
	})
		.middleware(async () => {
			const { id } = await useSession();

			if (!id) throw new UploadThingError("Unauthorized");

			return { userId: id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);

			await tempFileIntoSupabase(file, "insert");

			// return of below can be sent to client:
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
