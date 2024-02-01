import UploadFile from "./Upload Components/UploadFile"
import UploadFolder from "./Upload Components/UploadFolder"

export default function Files({ file_MP3, file_WAV, file_STEM, updateFields}) {
	return (
		<>
			<div className="flex flex-col gap-4">
				<UploadFile fileData={file_MP3} updateFields={updateFields} />
				<UploadFolder />
			</div>
		</>
	)
}
