import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import EditIcon from "@mui/icons-material/Edit"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

import FormControl from "@mui/material/FormControl"

import Image from "next/image"
// import { Button } from "../../UI/Button"
import { useState } from "react"

export default function BasicInfo({
	productImage,
	productImageSrc,
	title,
	type,
	releaseDate,
	description,
	updateFields,
}) {
	const [imageErr, setImageErr] = useState("")

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

	const contentType = [
		{ value: "Beat" },
		{ value: "Drum Kit" },
		{ value: "Melody" },
	]

	function handleChange(e) {
		const file = e.target.files[0]
		const fileIsImage = file.type.split("/")[0] === "image"

		if (!fileIsImage) {
			setImageErr("Please select a valid image file type")
			return
		} else {
			setImageErr("")
		}

		if (file) {
			updateFields({
				productImage: file,
				productImageSrc: URL.createObjectURL(file),
			})
		}
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
						{imageErr && (
							<span className="text-sm text-text-error">
								{imageErr}
							</span>
						)}
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
								updateFields({ title: e.target.value })
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
							name="releaseDate"
							label="Release Date"
							value={releaseDate || undefined}
							disablePast
							onChange={(date) => {
								updateFields({ releaseDate: date })
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
								})
							}}
						/>
					</div>
				</FormControl>
			</div>
		</>
	)
}
