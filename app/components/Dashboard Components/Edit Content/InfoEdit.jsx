"use client"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"

import { useState } from "react"
import TagInput from "../AddContentForm/Upload Components/TagInput"
import DropDown from "@/app/components/Dashboard Components/AddContentForm/Upload Components/DropDown.json"

export default function InfoEdit({ product }) {
	const INITIAL_DATA = {
		title: product.title,
		type: product.type,
		releaseDate: product.release_date,
		description: product.description,
		tags: product.tags,
		genres: product.genres,
		moods: product.moods,
		keys: product.keys,
		bpm: product.bpm,
		instruments: product.instruments,
	}

	const [data, setData] = useState(INITIAL_DATA)

	const contentType = [
		{ value: "Beat" },
		{ value: "Drum Kit" },
		{ value: "Melody" },
	]

	function updateFields(fields) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center">
				<label
					htmlFor="title"
					className="font-bold w-1/5 text-right pr-4"
				>
					Title:
				</label>

				<TextField
					className="flex-1"
					name="title"
					size="small"
					id="title"
					value={data.title}
					onChange={(e) => updateFields({ title: e.target.value })}
				/>
			</div>

			<div className="flex items-center">
				<label
					htmlFor="description"
					className="font-bold w-1/5 text-right pr-4"
				>
					Description:
				</label>
				<TextField
					className="flex-1"
					name="description"
					size="small"
					id="description"
					value={data.description}
					onChange={(e) =>
						updateFields({ description: e.target.value })
					}
				/>
			</div>
			<div className="flex items-center">
				<label
					htmlFor="type"
					className="font-bold w-1/5 text-right pr-4"
				>
					Type:
				</label>
				<TextField
					className="flex-1"
					name="type"
					size="small"
					id="type"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					select
					value={data.type}
					onChange={(e) => {
						updateFields({ type: e.target.value })
					}}
				>
					{contentType.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.value}
						</MenuItem>
					))}
				</TextField>
			</div>
			<div className="flex items-center">
				<label
					htmlFor="tags"
					className="font-bold w-1/5 text-right pr-4"
				>
					Tags:
				</label>
				<div className="flex-1">
					<TagInput
						name="tags"
						hashtag={true}
						disabled={false}
						value={data.tags}
						onChange={(newTagList) => {
							updateFields({ tags: newTagList })
						}}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<label
					htmlFor="genres"
					className="font-bold w-1/5 text-right pr-4"
				>
					Genres:
				</label>
				<div className="flex-1">
					<TagInput
						name="genres"
						dropDownList={DropDown.Genres}
						disabled={false}
						value={data.genres}
						onChange={(newTagList) => {
							updateFields({ genres: newTagList })
						}}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<label
					htmlFor="moods"
					className="font-bold w-1/5 text-right pr-4"
				>
					Moods:
				</label>
				<div className="flex-1">
					<TagInput
						name="moods"
						hashtag={true}
						dropDownList={DropDown.Moods}
						disabled={false}
						value={data.moods}
						onChange={(newTagList) => {
							updateFields({ moods: newTagList })
						}}
					/>
				</div>
			</div>
			<div className="flex items-center">
				<label
					htmlFor="keys"
					className="font-bold w-1/5 text-right pr-4"
				>
					Key:
				</label>

				<TextField
					name="keys"
					sx={{ width: "200px" }}
					size="small"
					id="type"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					select
					value={data.keys}
					onChange={(e) => {
						updateFields({ keys: e.target.value })
					}}
				>
					{DropDown.Keys.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>

				<label
					htmlFor="bpm"
					className="font-bold w-1/5 text-right pr-4"
				>
					BPM:
				</label>

				<TextField
					name="bpm"
					sx={{ width: "200px" }}
					size="small"
					id="title"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					value={data.bpm}
					onChange={(e) => {
						updateFields({ bpm: e.target.value })
					}}
				/>
			</div>
		</div>
	)
}
