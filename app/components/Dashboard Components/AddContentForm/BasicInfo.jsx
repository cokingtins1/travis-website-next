import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ImageIcon from "@mui/icons-material/Image";
import { UploadButton } from "@/app/utils/uploadthing";
import FormControl from "@mui/material/FormControl";

import Image from "next/image";
import { useState } from "react";
import { tempFileIntoSupabase } from "@/app/actions/tempFileIntoSupabase";

export default function BasicInfo({
	image_storage_url,
	image_storage_key,
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
			const fileObj = { key: image_storage_key };
			tempFileIntoSupabase(fileObj, "delete");
			updateFields({
				image_storage_url: data.url,
				image_storage_key: data.key,
				image_storage_name: data.name,
				image_storage_size: data.size,
			});
		} else {
			updateFields({
				image_storage_url: data.url,
				image_storage_key: data.key,
				image_storage_name: data.name,
				image_storage_size: data.size,
			});
		}

		setFileUploaded(true);
	}

	return (
		<>
			<div className="grid grid-cols-6 gap-4">
				<div className="col-span-2 flex items-start justify-center">
					<div className="flex flex-col items-center gap-2 ">
						{image_storage_url ? (
							<div className="relative size-[250px] border rounded-lg">
								<Image
									src={image_storage_url}
									sizes="(max-width: 430px), 250px "
									fill={true}
									style={{ objectFit: "cover" }}
									priority={true}
									alt="product image"
									id="productImage"
								/>
							</div>
						) : (
							<div className="size-[250px] flex flex-col justify-center items-center border border-text-secondary rounded-lg">
								<ImageIcon
									sx={{ fontSize: "7rem", color: "#a7a7a7" }}
								/>
								<p className="text-text-secondary">
									Upload Image
								</p>
							</div>
						)}

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
