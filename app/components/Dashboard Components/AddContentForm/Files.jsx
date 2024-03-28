import UploadFile from "./Upload Components/UploadFile";

export default function Files({
	// MP3_file,
	// MP3_fileName,
	// MP3_fileSize,

	MP3_storage_url,
	MP3_storage_key,
	MP3_storage_name,
	MP3_storage_size,

	// WAV_file,
	// WAV_fileName,
	// WAV_fileSize,

	WAV_storage_url,
	WAV_storage_key,
	WAV_storage_name,
	WAV_storage_size,

	// STEM_file,
	// STEM_fileName,
	// STEM_fileSize,
	// updateFields,

	STEM_storage_url,
	STEM_storage_key,
	STEM_storage_name,
	STEM_storage_size,

	updateFields,
}) {
	return (
		<>
			<div className="flex flex-col gap-4">
				<UploadFile
					type="MP3"
					fileProps={MP3_storage_key}
					fileNameProps={MP3_storage_name}
					fileSizeProps={MP3_storage_size}
					updateFields={(fields) =>
						updateFields({
							MP3_storage_name: fields.fileName,
							MP3_storage_url: fields.fileUrl,
							MP3_storage_key: fields.fileKey,
							MP3_storage_size: fields.fileSize,

							title: fields.fileName
								? fields.fileName.split(".")[0]
								: null,
							basic: fields.switch,
							basicPriceId: fields.id,
						})
					}
				/>
				<UploadFile
					type="WAV"
					fileProps={WAV_storage_key}
					fileNameProps={WAV_storage_name}
					fileSizeProps={WAV_storage_size}
					updateFields={(fields) =>
						updateFields({
							WAV_storage_name: fields.fileName,
							WAV_storage_url: fields.fileUrl,
							WAV_storage_key: fields.fileKey,
							WAV_storage_size: fields.fileSize,

							title: fields.fileName
								? fields.fileName.split(".")[0]
								: null,
							basic: fields.switch,
							basicPriceId: fields.id,
						})
					}
				/>
				<UploadFile
					type="STEM"
					fileProps={STEM_storage_key}
					fileNameProps={STEM_storage_name}
					fileSizeProps={STEM_storage_size}
					updateFields={(fields) =>
						updateFields({
							STEM_storage_name: fields.fileName,
							STEM_storage_url: fields.fileUrl,
							STEM_storage_key: fields.fileKey,
							STEM_storage_size: fields.fileSize,
							title: fields.fileName
								? fields.fileName.split(".")[0]
								: null,
							basic: fields.switch,
							basicPriceId: fields.id,
						})
					}
				/>
			</div>
		</>
	);
}
