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

import MetaData from "./MetaData"
import Pricing from "./Pricing"
import { Button } from "../../UI/Button"

const INITIAL_DATA = {
	files: null,
	title: "",
	type: "",
	releaseDate: dayjs(),
	description: "",
	tags: "",
	genres: "",
	moods: "",
	keys: "None",
	bpm: "",
	instruments: "",
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

	function handleSubmit(e) {
		e.preventDefault()
		if (!isLastStep) return next()
	}

	const [value, setValue] = useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	const indices = [
		{ index: 0, value: "Upload Files" },
		{ index: 1, value: "Basic Info" },
		{ index: 2, value: "Meta Data" },
		{ index: 3, value: "Pricing" },
	]

	// console.log(data)

	return (
		<>
			<div className="w-full bg-bg-elevated border border-black p-4 rounded-md ">
				<form action="" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<div>
							<Tabs onChange={handleChange} value={value}>
								{indices.map((step) => (
									<Tab
										label={step.value}
										onClick={() => {
											setValue(step.index)
											goTo(step.index)
										}}
									/>
								))}
							</Tabs>
						</div>
						<div className="h-[36rem] overflow-auto p-2 mt-4">
							{step}
						</div>
						<Divider />
						<div className="flex mt-4 gap-2 self-end ">
							{!isFirstStep && (
								<Button
									size="lg"
									onClick={() => {
										back()
										setValue(currentStepIndex - 1)
									}}
									type="button"
								>
									Back
								</Button>
							)}
							<Button
								size="lg"
								type={isLastStep ? "submit" : "button"}
								onClick={() => {
									next()
									!isLastStep &&
										setValue(currentStepIndex + 1)
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
