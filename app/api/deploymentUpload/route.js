import { useSession } from "@/libs/supabase/useSession";
import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();

	try {
		const jsonResponse = await handleUpload({
			body,
			request,
			onBeforeGenerateToken: async (
				pathname
				/* clientPayload?: string, */
			) => {
				// Generate a client token for the browser to upload the file

				// ⚠️ Authenticate users before generating the token.
				// Otherwise, you're allowing anonymous uploads.
				// const { user } = await auth(request);
				// console.log("hi");
				// console.log("user", user);
				// const userCanUpload = canUpload(user, pathname);
				// if (!userCanUpload) {
				// 	throw new Error("Not authorized");
				// }

				const { id: userId } = await useSession();
				// console.log("userId", userId);

				return {
					allowedContentTypes: [
						"image/jpeg",
						"image/png",
						"image/gif",
						"audio/mpeg",
						"audio/wav",
						"application/zip",
						"application/x-zip-compressed",
					],
					tokenPayload: JSON.stringify({
						// optional, sent to your server on upload completion
						userId: userId,
					}),
				};
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				// Get notified of client upload completion
				// ⚠️ This will not work on `localhost` websites,
				// Use ngrok or similar to get the full upload flow

				console.log("blob upload completed", blob, tokenPayload);

				try {
					// Run any logic after the file upload completed
					// const { userId } = JSON.parse(tokenPayload);
					// await db.update({ avatar: blob.url, userId });
				} catch (error) {
					throw new Error("Could not update user");
				}
			},
		});

		return NextResponse.json(jsonResponse);
	} catch (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 400 } // The webhook will retry 5 times waiting for a 200
		);
	}
}
