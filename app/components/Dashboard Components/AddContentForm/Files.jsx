import UploadFile from "./Upload Components/UploadFile"

export default function Files({
	MP3_file,
	MP3_fileName,
	MP3_fileSize,

	WAV_file,
	WAV_fileName,
	WAV_fileSize,

	STEM_file,
	STEM_fileName,
	STEM_fileSize,
	updateFields,
}) {
	return (
		<>
			<div className="flex flex-col gap-4">
				<UploadFile
					type="MP3"
					fileProps={MP3_file}
					fileNameProps={MP3_fileName}
					fileSizeProps={MP3_fileSize}
					updateFields={(fields) =>
						updateFields({
							MP3_file: fields.file,
							MP3_fileName: fields.fileName,
							MP3_fileSize: fields.fileSize,
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
					fileProps={WAV_file}
					fileNameProps={WAV_fileName}
					fileSizeProps={WAV_fileSize}
					updateFields={(fields) =>
						updateFields({
							WAV_file: fields.file,
							WAV_fileName: fields.fileName,
							WAV_fileSize: fields.fileSize,
							title: fields.fileName
								? fields.fileName.split(".")[0]
								: null,
							premium: fields.switch,
							premiumPriceId: fields.id,
						})
					}
				/>
				<UploadFile
					type="STEM"
					fileProps={STEM_file}
					fileNameProps={STEM_fileName}
					fileSizeProps={STEM_fileSize}
					updateFields={(fields) =>
						updateFields({
							STEM_file: fields.file,
							STEM_fileName: fields.fileName,
							STEM_fileSize: fields.fileSize,
							exclusive: fields.switch,
							exclusivePriceId: fields.id,
						})
					}
				/>
			</div>
		</>
	)
}
