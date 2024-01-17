"use client"
// BasicInto.jsx
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import dayjs from "dayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"

import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"

import styles from "./BasicInfo.module.css"
import { useState } from "react"

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

	const [date, setDate] = useState()
	return (
		<>
			<div className={styles.formContainer}>
				<div>
					<Image
						width={250}
						src={beatKitImage}
						alt="product image"
					></Image>
				</div>
				<FormControl>
					<div className={styles.inputContainer}>
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
						{/* <TextField
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
						</TextField> */}

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
							rows={3}
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
