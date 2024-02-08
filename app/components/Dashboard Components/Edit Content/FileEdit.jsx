"use client"

import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import { styled } from "@mui/material/styles"
import UploadFile from "../AddContentForm/Upload Components/UploadFile"

export default function FileEdit({ productFiles }) {

	const INITIAL_DATA = {
		MP3_file: productFiles.MP3_file,
		MP3_fileName: productFiles.MP3_fileName,
		MP3_fileSize: productFiles.MP3_fileSize,
	
		WAV_file: productFiles.WAV_file,
		WAV_fileName: productFiles.WAV_fileName,
		WAV_fileSize: productFiles.WAV_fileSize,
	
		STEM_file: productFiles.STEM_file,
		STEM_fileName: productFiles.STEM_file,
		STEM_fileSize: productFiles.STEM_file,
	}

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	})

	return (
		<>
			<div className="flex justify-center items-center flex-col">
				<Image
					alt=""
					src={
						productFiles.productImage
							? productFiles.productImage
							: beatKitImage
					}
					height={500}
					width={500}
				/>
				<Button
					type="button"
					size="lg"
					sx={{
						color: "#a7a7a7",
						"&:hover": { backgroundColor: "#2a2a2a" },
					}}
					startIcon={<EditIcon />}
				>
					<label className="cursor-pointer">
						{" "}
						Edit Picture
						<VisuallyHiddenInput
							name="file"
							onChange={(e) => {
								handleChange(e)
							}}
							type="file"
						/>
					</label>
				</Button>
			</div>
			<div className="flex flex-col">
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
							title: fields.fileName.split(".")[0],
						})
					}
				/>
				<p>File</p>
				<p>File</p>
			</div>
		</>
	)
}
