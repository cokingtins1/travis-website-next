"use client"
// AddContentForm.jsx
import { useEffect, useState } from "react"

import useMultipleStepForm from "./useMultipleStepForm"
import BasicInfo from "./BasicInfo"
import Files from "./Files"
import dayjs from "dayjs"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Divider from "@mui/material/Divider"
import beatKitImage from "@/public/beatKitImage.jpg"
import { toast } from "react-toastify"

import MetaData from "./MetaData"
import Pricing from "./Pricing"
import { Button } from "../../UI/Button"
import { createFormData } from "@/libs/utils"
import AudioDrawer from "../../Audio/AudioDrawer"
import { useAudio } from "@/libs/contexts/AudioContext"

const INITIAL_DATA = {
	MP3_file: null,
	MP3_fileName: null,
	MP3_fileSize: null,

	WAV_file: null,
	WAV_fileName: null,
	WAV_fileSize: null,

	STEM_file: null,
	STEM_fileName: null,
	STEM_fileSize: null,

	productImage: beatKitImage,
	productImageSrc: beatKitImage,
	title: "",
	type: "",
	releaseDate: dayjs(),
	description: "",
	tags: [],
	genres: [],
	moods: [],
	keys: "None",
	bpm: 0,
	instruments: [],
	videoLink: "",

	basic: true,
	basicPrice: 30,
	premium: true,
	premiumPrice: 50,
	exclusive: true,
	exclusivePrice: 250,
	free: false,
}

export default function AddContentForm() {
	const [data, setData] = useState(INITIAL_DATA)
	const [tabValue, setTabValue] = useState(0)

	const [fileLoading, setFileLoading] = useState(false)
	const [dataLoading, setDataLoading] = useState(false)
	const [error, setError] = useState([])

	const {
		drawerOpen,
		setRef,
		audioSrc,
		audioSrcId,
		setAudioSrcId,
		setDrawerOpen,
		setAudioSrc,
		file,
		ref,
		buttonId,
		clearAudio,
	} = useAudio()

	useEffect(() => {
		clearAudio()
	}, [])

	const indices = [
		{ index: 0, value: "Upload Files" },
		{ index: 1, value: "Basic Info" },
		{ index: 2, value: "Meta Data" },
		{ index: 3, value: "Pricing" },
	]

	function updateFields(fields) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}

	function addError(error) {
		setError((prev) => {
			return [...prev, error]
		})
	}

	const {
		steps,
		currentStepIndex,
		step,
		isFirstStep,
		isLastStep,
		back,
		next,
		goTo,
	} = useMultipleStepForm([
		<Files key="files" {...data} updateFields={updateFields} />,
		<BasicInfo key="basicInfo" {...data} updateFields={updateFields} />,
		<MetaData key="metaData" {...data} updateFields={updateFields} />,
		<Pricing key="pricing" {...data} updateFields={updateFields} />,
	])

	async function handleSubmit(e) {
		e.preventDefault()
		if (!isLastStep) return next()

		const formData = createFormData(data)

		try {
			setDataLoading(true)

			const res = await toast.promise(
				fetch("/api/uploadData", {
					method: "POST",
					body: formData,
				}),
				{
					pending: "Uploading product data",
					success: "Product data uploaded successfully",
					error: "Error uploading product data files",
				}
			)
			if (res.ok) {
				setDataLoading(false)
				console.log(await res.json())
			} else {
				addError("There was an error uploading the product data")
				setDataLoading(false)
				throw new Error("There was an error uploading the product data")
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className="w-full bg-bg-elevated border border-black p-4 rounded-md ">
				<form>
					<div className="flex flex-col">
						<div>
							<Tabs
								onChange={(e) => {
									setTabValue(e.target.value)
								}}
								value={tabValue}
							>
								{indices.map((step) => (
									<Tab
										key={step.index}
										label={step.value}
										onClick={() => {
											setTabValue(step.index)
											goTo(step.index)
										}}
									/>
								))}
							</Tabs>
						</div>
						<div className="h-[32rem] overflow-auto p-2 mt-4">
							{step}
						</div>
						<div className="h-[110px]">
							{audioSrcId && (
								<AudioDrawer
									key={audioSrcId}
									audioSrc={audioSrcId}
									srcType={"audio/mpeg"}
									buttonId={buttonId}
									file={true}
								/>
							)}
						</div>
						<Divider />
						<div className="flex mt-4 gap-2 self-end items-center ">
							{error && (
								<p className="text-text-error">{error}</p>
							)}
							{(fileLoading || dataLoading) && (
								<p className="text-text-secondary italic">
									Uploading files...
								</p>
							)}
							{!isFirstStep && (
								<Button
									size="lg"
									onClick={() => {
										back()
										setTabValue(currentStepIndex - 1)
									}}
									type="button"
								>
									Back
								</Button>
							)}
							<Button
								size="lg"
								disabled={fileLoading || dataLoading}
								type={isLastStep ? "submit" : "button"}
								onClick={(e) => {
									handleSubmit(e)
									!isLastStep &&
										setTabValue(currentStepIndex + 1)
								}}
							>
								{isLastStep ? "Upload" : "Next"}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}
