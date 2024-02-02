import UploadFile from "./Upload Components/UploadFile"
import UploadFolder from "./Upload Components/UploadFolder"

export default function Files({
	MP3_file,
	MP3_fileName,
	MP3_fileSize,
	MP3_fileSrc,

	WAV_file,
	WAV_fileName,
	WAV_fileSize,
	WAV_fileSrc,

	STEM_file,
	STEM_fileName,
	STEM_fileSize,
	STEM_fileSrc,
	updateFields,
}) {
	return (
		<>
			<div className="flex flex-col gap-4">
				<UploadFile fileProps={MP3_file} fileNameProps={MP3_fileName} fileSizeProps={MP3_fileSize} fileSrcProps={MP3_fileSrc} updateFields={updateFields} />
				{/* <UploadFile fileData={file_MP3} updateFields={updateFields} /> */}
				{/* <UploadFolder /> */}
			</div>
		</>
	)
}
