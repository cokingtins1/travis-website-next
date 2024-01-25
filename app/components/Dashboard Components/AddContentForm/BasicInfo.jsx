import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import EditIcon from "@mui/icons-material/Edit"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import FormControl from "@mui/material/FormControl"

import Image from "next/image"
import { Button } from "../../UI/Button"
import { useState } from "react"

export default function BasicInfo({
	image,
	title,
	type,
	releaseDate,
	description,
	updateFields,
}) {
	const [selectedImage, setSelectedImage] = useState(null)

	const contentType = [
		{ value: "Beat" },
		{ value: "Drum Kit" },
		{ value: "Melody" },
	]

	function handleUpload(e) {
		const file = e.target.files[0]

		if (file == null) return
		setSelectedImage(file)
	}

	return (
		<>
			<div className="grid grid-cols-6 gap-4">
				<div className="col-span-2 flex items-start justify-center">
					<div className="flex flex-col items-center gap-2 ">
						<Image
							width={250}
							height={250}
							className="border rounded-lg"
							src={
								selectedImage
									? URL.createObjectURL(selectedImage)
									: image
							}
							alt="product image"
							onChange={() => {
								updateFields({ image: selectedImage })
							}}
						/>

						<Button type="button" size="lg" icon={<EditIcon />}>
							<label className="cursor-pointer">
								{" "}
								Edit Picture
								<input
									className="opacity-0 absolute left-[-9999px]"
									type="file"
									name="myImage"
									onChange={handleUpload}
								/>
							</label>
						</Button>
					</div>
				</div>
				<FormControl className="col-span-4">
					<div className="grid grid-cols-2 grid-rows-5 gap-x-4 gap-y-4">
						<TextField
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
								updateFields({ title: e.target.value })
							}}
						/>
						<TextField
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
								updateFields({ type: e.target.value })
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
							label="Release Date"
							value={releaseDate}
							disablePast
							onChange={(date) => {
								updateFields({ releaseDate: date })
							}}
						/>
						<TextField
							className="col-span-2 row-span-3"
							fullWidth
							multiline
							rows={5}
							id="title"
							label="Description (optional)"
							type="text"
							value={description}
							onChange={(e) => {
								updateFields({
									description: e.target.value,
								})
							}}
						/>
					</div>
				</FormControl>
			</div>
		</>
	)
}
