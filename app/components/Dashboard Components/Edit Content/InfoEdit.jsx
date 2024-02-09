"use client"

import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Switch from "@mui/material/Switch"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"

import { styled } from "@mui/material/styles"
import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"

import { useState } from "react"
import TagInput from "../AddContentForm/Upload Components/TagInput"
import DropDown from "@/app/components/Dashboard Components/AddContentForm/Upload Components/DropDown.json"
import { toast } from "react-toastify"
import PricingSwitch from "../AddContentForm/Upload Components/PricingSwitch"
import SubmitModal from "../../UI/SubmitModal"
import EditFile from "../AddContentForm/Upload Components/EditFile"

export default function InfoEdit({ product, productFiles }) {
	const INITIAL_DATA = {
		MP3_file: productFiles.MP3_file,
		MP3_fileName: productFiles.MP3_file.name,
		MP3_fileSize: productFiles.MP3_file.metadata.size,

		WAV_file: productFiles.WAV_file,
		WAV_fileName: productFiles.WAV_file.name,
		WAV_fileSize: productFiles.WAV_file.metadata.size,

		// STEM_file: productFiles.STEM_file,
		// STEM_fileName: productFiles.STEM_file.name,
		// STEM_fileSize: productFiles.STEM_file.metadata.size,

		title: product.title,
		description: product.description,
		type: product.type,
		tags: product.tags,
		genres: product.genres,
		moods: product.moods,
		instruments: product.instruments,
		keys: product.keys,
		bpm: product.bpm,
		basic: product.basic,
		basicPrice: product.basic_price,
		premium: product.premium,
		premiumPrice: product.premium_price,
		exclusive: product.exclusive,
		exclusivePrice: product.exclusive_price,
		free: product.free,
	}

	const [data, setData] = useState(INITIAL_DATA)
	const [editing, setEditing] = useState(false)
	const [dataLoading, setDataLoading] = useState(false)

	function abortEditing(e) {
		e.preventDefault()
		setEditing(!editing)
		setData(INITIAL_DATA)
	}

	async function deleteProduct(e) {
		e.preventDefault()
		console.log("deleting product")
	}

	async function handleSubmit(e) {
		e.preventDefault()

		console.log("submitting form")

		const JSONFormData = {}
		JSONFormData["upload_id"] = product.upload_id

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				const value = data[key]
				JSONFormData[key] = value
			}
		}

		try {
			setDataLoading(true)
			const res = await toast.promise(
				fetch("/api/updateData", {
					method: "PUT",
					body: JSON.stringify(JSONFormData),
				}),
				{
					pending: "Upadating fields",
					success: "Fields updated successfully",
					error: "Error updating filds",
				}
			)

			if (res.ok) {
				setDataLoading(false)
				setEditing(false)
			} else {
				setDataLoading(false)
				throw new Error("There was an error updating the files")
			}
		} catch (error) {
			console.log(error)
		}

		// console.log("intiial data:", INITIAL_DATA, "data:", data)
		// console.log(INITIAL_DATA == data)
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
		<form>
			<div className="max-w-[1200px] grid grid-cols-12 gap-4 p-4">
				<div className="col-span-4">
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
					<div className="flex flex-col gap-4">
						<EditFile
							type="MP3"
							fileProps={data.MP3_file}
							fileNameProps={data.MP3_fileName}
							fileSizeProps={data.MP3_fileSize}
							updateFields={(fields) =>
								updateFields({
									MP3_file: fields.file,
									MP3_fileName: fields.fileName,
									MP3_fileSize: fields.fileSize,
								})
							}
						/>
						<EditFile
							type="WAV"
							fileProps={data.WAV_file}
							fileNameProps={data.WAV_fileName}
							fileSizeProps={data.WAV_fileSize}
							updateFields={(fields) =>
								updateFields({
									WAV_file: fields.file,
									WAV_fileName: fields.fileName,
									WAV_fileSize: fields.fileSize,
								})
							}
						/>
						<EditFile
							type="WAV"
							fileProps={data.MP3_file}
							fileNameProps={data.MP3_fileName}
							fileSizeProps={data.MP3_fileSize}
							updateFields={(fields) =>
								updateFields({
									MP3_file: fields.file,
									MP3_fileName: fields.fileName,
									MP3_fileSize: fields.fileSize,
								})
							}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-4 col-span-8">
					<div className="flex justify-end gap-4">
						{editing || (
							<SubmitModal
								variant="delete"
								callback={deleteProduct}
							/>
						)}
						{!editing ? (
							<Button
								disabled={dataLoading}
								type="button"
								onClick={(e) => {
									setEditing(true)
									e.preventDefault()
								}}
							>
								Edit Fields
							</Button>
						) : (
							<>
								<Button color="warning" onClick={abortEditing}>
									Discard Changes
								</Button>
								<SubmitModal
									variant="update"
									callback={handleSubmit}
								/>
							</>
						)}
					</div>
					<div className="flex items-center">
						<label
							htmlFor="title"
							className=" w-1/5 text-right pr-4"
						>
							Title:
						</label>
						<TextField
							className="flex-1"
							disabled={!editing}
							name="title"
							size="small"
							id="title"
							value={data.title}
							onChange={(e) =>
								updateFields({ title: e.target.value })
							}
						/>
					</div>

					<div className="flex items-center">
						<label
							htmlFor="description"
							className=" w-1/5 text-right pr-4"
						>
							Description:
						</label>
						<TextField
							className="flex-1"
							disabled={!editing}
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
							className=" w-1/5 text-right pr-4"
						>
							Type:
						</label>
						<TextField
							className="flex-1"
							disabled={!editing}
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
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.value}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div className="flex items-center">
						<label
							htmlFor="tags"
							className=" w-1/5 text-right pr-4"
						>
							Tags:
						</label>
						<div className="flex-1">
							<TagInput
								name="tags"
								update={true}
								hashtag={true}
								disabled={!editing}
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
							className=" w-1/5 text-right pr-4"
						>
							Genres:
						</label>
						<div className="flex-1">
							<TagInput
								name="genres"
								update={true}
								addFunctionality
								dropDownList={DropDown.Genres}
								disabled={!editing}
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
							className=" w-1/5 text-right pr-4"
						>
							Moods:
						</label>
						<div className="flex-1">
							<TagInput
								name="moods"
								update={true}
								addFunctionality
								hashtag={true}
								dropDownList={DropDown.Moods}
								disabled={!editing}
								value={data.moods}
								onChange={(newTagList) => {
									updateFields({ moods: newTagList })
								}}
							/>
						</div>
					</div>
					<div className="flex items-center">
						<label
							htmlFor="instruments"
							className=" w-1/5 text-right pr-4"
						>
							Instruments:
						</label>
						<div className="flex-1">
							<TagInput
								name="instruments"
								update={true}
								hashtag={true}
								addFunctionality
								dropDownList={DropDown.Instruments}
								disabled={!editing}
								value={data.instruments}
								onChange={(newTagList) => {
									updateFields({ instruments: newTagList })
								}}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="keys"
							className=" w-1/5 text-right pr-4"
						>
							Key:
						</label>
						<TextField
							disabled={!editing}
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

						<label htmlFor="bpm" className=" w-1/5 text-right pr-4">
							BPM:
						</label>

						<TextField
							disabled={!editing}
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
					<div>
						<div className="flex items-start flex-col gap-4 pl-16">
							<PricingSwitch
								width="w-full"
								disabled={!editing}
								nameSwitch="exclusive"
								namePrice="exclusivePrice"
								defaultChecked={data.exclusive}
								contractTitle={"Exclusive License"}
								contractSubtext={"WAV, MP3, STEMS"}
								value={data.exclusivePrice}
								onCheckedChange={(newChecked) => {
									updateFields({
										exclusive: newChecked,
									})
								}}
								onChange={(newPrice) => {
									updateFields({
										exclusivePrice: newPrice,
									})
								}}
							/>
							<PricingSwitch
								width="w-full"
								disabled={!editing}
								nameSwitch="basic"
								namePrice="basicPrice"
								defaultChecked={data.basic}
								contractTitle={"Basic License"}
								contractSubtext={"MP3"}
								value={data.basicPrice}
								onCheckedChange={(newChecked) => {
									updateFields({
										basic: newChecked,
									})
								}}
								onChange={(newPrice) => {
									updateFields({
										basicPrice: newPrice,
									})
								}}
							/>
							<PricingSwitch
								width="w-full"
								disabled={!editing}
								nameSwitch="premium"
								namePrice="premiumPrice"
								defaultChecked={data.premium}
								contractTitle={"Exclusive License"}
								contractSubtext={"WAV, MP3"}
								value={data.premiumPrice}
								onCheckedChange={(newChecked) => {
									updateFields({
										premium: newChecked,
									})
								}}
								onChange={(newPrice) => {
									updateFields({
										premiumPrice: newPrice,
									})
								}}
							/>
							<div className="flex w-full">
								<div className="flex items-center rounded-lg border border-border-primary p-2 w-full">
									<span className="flex items-center p-2">
										<Switch
											name="free"
											disabled={!editing}
											checked={data.free}
											value={data.free}
											onChange={() => {
												setFreeChecked(!data.free)
												updateFields({
													free: !data.free,
												})
											}}
										/>
									</span>
									<div>
										<p className="font-semibold">Free</p>
										<p className="text-sm text-text-secondary">
											Tagged MP3
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
