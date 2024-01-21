"use client"
// AddContentForm.jsx
import { useState } from "react"

import useMultipleStepForm from "./useMultipleStepForm"
import BasicInfo from "./BasicInfo"
import Files from "./Files"
import dayjs from "dayjs"

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
	keys: "",
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
	} = useMultipleStepForm([
		<Files {...data} updateFields={updateFields} />,
		<BasicInfo {...data} updateFields={updateFields} />,
		<MetaData {...data} updateFields={updateFields} />,
		<Pricing {...data} updateFields={updateFields} />,
	])

	function handleSubmit(e) {
		e.preventDefault()
		if (!isLastStep) return next()
		alert("Form submitted")
	}

	// console.log(data)
	// console.log(
	// 	"step:",
	// 	currentStepIndex,
	// 	"isFirstStep:",
	// 	isFirstStep,
	// 	"isLastStep:",
	// 	isLastStep
	// )

	return (
		<>
			<div className="w-full border border-black p-4 rounded-md ">
				<form action="" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<div className="flex self-end m-1">
							{currentStepIndex + 1} / {steps.length}
						</div>
						<div className="h-[36rem] overflow-auto p-2">
							{step}
						</div>
						<div className="flex mt-4 gap-2 self-end ">
							{!isFirstStep && (
								<Button onClick={back} type='button'>Back</Button>
							)}
							<Button onClick={next}>
								{isLastStep ? "Upload" : "Next"}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}
