"use client"
// AddContentForm.jsx
import { useState } from "react"

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

const INITIAL_DATA = {
	files: null,
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
	price: {
		exclusive: {
			checked: true,
			price: 250,
		},
		basic: {
			checked: true,
			price: 30,
		},
		premium: {
			checked: true,
			price: 50,
		},
	},
}

export default function AddContentForm() {
	const [data, setData] = useState(INITIAL_DATA)

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
		<Files {...data} updateFields={updateFields} />,
		<BasicInfo {...data} updateFields={updateFields} />,
		<MetaData {...data} updateFields={updateFields} />,
		<Pricing {...data} updateFields={updateFields} />,
	])

	async function handleSubmit(e) {
		e.preventDefault()
		if (!isLastStep) return next()
		await addProducts(JSON.parse(JSON.stringify(data)))
		console.log(JSON.parse(JSON.stringify(data)))
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

	return (
		<>
			<div className="w-full bg-bg-elevated border border-black p-4 rounded-md ">
				<form action="" onSubmit={handleSubmit}>
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
