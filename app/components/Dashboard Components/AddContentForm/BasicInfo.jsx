import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import EditIcon from "@mui/icons-material/Edit"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import Button from "@mui/material/Button"

import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"

import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"

export default function BasicInfo({
	title,
	type,
	releaseDate,
	description,
	updateFields,
}) {
	const contentType = [
		{ value: "Beat" },
		{ value: "Drum Kit" },
		{ value: "Melody" },
	]

	return (
		<>
			<div className="grid grid-cols-6 gap-4">
				<div className="col-span-2 flex items-start justify-center">
					<div className="flex flex-col items-center ">
						<Image
							width={250}
							src={beatKitImage}
							alt="product image"
						></Image>
						<Button>
							{" "}
							<span className='mx-2'><EditIcon /> </span>
							Edit Picture
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
							disableFuture
							// onChange={(newValue) => setDate(newValue)}
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
								updateFields({ description: e.target.value })
							}}
						/>
					</div>
				</FormControl>
			</div>
		</>
	)
}
