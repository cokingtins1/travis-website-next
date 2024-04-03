import { UploadButton } from "@/app/utils/uploadthing";

type ButtonProps = {
	endpoint: any;
	clientUploadCallback: (res: any) => void;
	onClientUploadComplete: (res: any) => void;
	onUploadError: (res: any) => void;
};

export const UTUploadButton = ({
	endpoint,
	clientUploadCallback,
  onClientUploadComplete,
}: ButtonProps) => (
	<UploadButton
		endpoint={endpoint}
		onClientUploadComplete={(res) => {
			if (res.length === 0) return;
			clientUploadCallback(res[0]);
		}}
		onUploadError={(error: Error) => {
			// Do something with the error.
			alert(`ERROR! ${error.message}`);
		}}
		onBeforeUploadBegin={(files) => {
			// Preprocess files before uploading (e.g. rename them)
			return files.map(
				(f) => new File([f], "renamed-" + f.name, { type: f.type })
			);
		}}
		onUploadBegin={(name) => {
			// Do something once upload begins
			console.log("Uploading: ", name);
		}}
	/>
);
