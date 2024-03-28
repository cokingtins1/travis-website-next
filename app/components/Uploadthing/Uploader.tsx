import { UploadButton } from "../../utils/uploadthing";

export default function Uploader() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<UploadButton
				endpoint="mp3Uploader"
				onClientUploadComplete={(res) => {
					// Do something with the response
					console.log("Files: ", res);
					alert("Upload Completed");
				}}
				onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
				}}
			/>
		</main>
	);
}
