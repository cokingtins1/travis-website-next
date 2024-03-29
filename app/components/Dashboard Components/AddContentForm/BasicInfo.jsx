import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { UploadButton } from "@/app/utils/uploadthing";
import beatKitImage from "@/public/beatKitImage.jpg";

import FormControl from "@mui/material/FormControl";

import Image from "next/image";
import { useState } from "react";
import { tempFileIntoSupabase } from "@/app/actions/tempFileIntoSupabase";

export default function BasicInfo({
	productImageSrc,
	productImageKey,
	title,
	type,
	releaseDate,
	description,
	updateFields,
}) {
	const [fileUploaded, setFileUploaded] = useState(false);

	const contentType = [
		{ value: "Beat" },
		{ value: "Drum Kit" },
		{ value: "Melody" },
	];

	function handleChange(data) {
		if (fileUploaded) {
			const fileObj = { key: productImageKey };
			tempFileIntoSupabase(fileObj, "delete");
			updateFields({
				productImage: data.key,
				productImageSrc: data.url,
				productImageKey: data.key,
			});
		} else {
			updateFields({
				productImage: data.key,
				productImageSrc: data.url,
				productImageKey: data.key,
			});
		}

		setFileUploaded(true);
	}

	return (
		<>
			<div className="grid grid-cols-6 gap-4">
				<div className="col-span-2 flex items-start justify-center">
					<div className="flex flex-col items-center gap-2 ">
						<Image
							id="productImage"
							width={250}
							height={250}
							className="border rounded-lg"
							src={productImageSrc}
							alt="product image"
						/>

						<UploadButton
							endpoint="imageUploader"
							className="ut-button:bg-[#1976D2]"
							onClientUploadComplete={(res) => {
								if (res.length === 0) return;
								handleChange(res[0]);
							}}
							onUploadError={(error) => {
								alert(`ERROR! ${error.message}`);
							}}
						/>
					</div>
				</div>
				<FormControl className="col-span-4">
					<div className="grid grid-cols-2 grid-rows-5 gap-x-4 gap-y-4">
						<TextField
							name="title"
							className="col-span-2"
							fullWidth
							size="small"
							id="title"
							label="Title"
							type="text"
							InputLabelProps={{
								shrink: true,
							}}
							value={title}
							onChange={(e) => {
								updateFields({ title: e.target.value });
							}}
						/>
						<TextField
							name="type"
							fullWidth
							size="medium"
							id="type"
							label="Type"
							type="text"
							InputLabelProps={{
								shrink: true,
							}}
							select
							value={type}
							onChange={(e) => {
								updateFields({ type: e.target.value });
							}}
						>
							{contentType.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.value}
								</MenuItem>
							))}
						</TextField>

						<DatePicker
							name="releaseDate"
							label="Release Date"
							value={releaseDate || undefined}
							disablePast
							onChange={(date) => {
								updateFields({ releaseDate: date });
							}}
						/>
						<TextField
							name="description"
							className="col-span-2 row-span-3"
							fullWidth
							multiline
							rows={5}
							id="description"
							label="Description (optional)"
							type="text"
							value={description}
							onChange={(e) => {
								updateFields({
									description: e.target.value,
								});
							}}
						/>
					</div>
				</FormControl>
			</div>
		</>
	);
}
