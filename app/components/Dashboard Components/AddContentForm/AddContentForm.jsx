"use client"
// AddContentForm.jsx
import { useEffect, useState, useRef } from "react"

import useMultipleStepForm from "./useMultipleStepForm"
import BasicInfo from "./BasicInfo"
import Files from "./Files"
import dayjs from "dayjs"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Divider from "@mui/material/Divider"
import beatKitImage from "@/public/beatKitImage.jpg"

import MetaData from "./MetaData"
import Pricing from "./Pricing"
import { Button } from "../../UI/Button"
import { addProducts } from "@/libs/supabase/addProducts"
import NewFiles from "./Upload Components/NewFiles"

const INITIAL_DATA = {
	// file_MP3: {
	// 	file: null,
	// 	fileName: "",
	// 	src: "",
	// 	size: 0,
	// },
	MP3_file: null,
	MP3_fileName: null,
	MP3_fileSize: "hellooooo",
	MP3_fileSrc: null,

	WAV_file: null,
	WAV_fileName: null,
	WAV_fileSize: null,
	WAV_fileSrc: null,

	STEM_file: null,
	STEM_fileName: null,
	STEM_fileSize: null,
	STEM_fileSrc: null,

	image: beatKitImage,
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
	basic: true,
	basicPrice: 30,
	premium: true,
	premiumPrice: 50,
	exclusive: true,
	exclusivePrice: 250,
	free: false,
	// price: {
	// 	basic: {
	// 		checked: true,
	// 		price: 30,
	// 	},
	// 	premium: {
	// 		checked: true,
	// 		price: 50,
	// 	},
	// 	exclusive: {
	// 		checked: true,
	// 		price: 250,
	// 	},
	// },
}

export default function AddContentForm() {
	const [data, setData] = useState(INITIAL_DATA)
	const formRef = useRef(null)

	function updateFields(fields) {
		setData((prev) => {
			return { ...prev, ...fields }
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

		console.log(formRef.current)
		const formData = new FormData(formRef.current)
		for (const item of formData) {
			console.log(item[0], item[1])
		}
		// await addProducts(JSON.parse(JSON.stringify(data)))
		// console.log("data before server:", data)
		// await addProducts(data)
		// console.log(JSON.parse(JSON.stringify(data)))
	}

	const [tabValue, setTabValue] = useState(0)
	const handleChange = (newValue) => {
		setTabValue(newValue)
	}
	const indices = [
		{ index: 0, value: "Upload Files" },
		{ index: 1, value: "Basic Info" },
		{ index: 2, value: "Meta Data" },
		{ index: 3, value: "Pricing" },
	]

	// console.log("form data", data)

	// useEffect(() => {
	// 	console.log("MP3_file:", data.MP3_file)
	// }, [data])

	return (
		<>
			<div className="hidden">
				<form ref={formRef} action="">
					<Files key="files" {...data} updateFields={updateFields} />
					,
					<BasicInfo
						key="basicInfo"
						{...data}
						updateFields={updateFields}
					/>
					,
					<MetaData
						key="metaData"
						{...data}
						updateFields={updateFields}
					/>
					,
					<Pricing
						key="pricing"
						{...data}
						updateFields={updateFields}
					/>
					,
				</form>
			</div>
			<div className="w-full bg-bg-elevated border border-black p-4 rounded-md ">
				<form>
					<div className="flex flex-col">
						<div>
							<Tabs onChange={handleChange} value={tabValue}>
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
						<Divider />
						<div className="flex mt-4 gap-2 self-end ">
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
