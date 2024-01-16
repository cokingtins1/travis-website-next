"use client"

import { useState } from "react"

import useMultipleStepForm from "./useMultipleStepForm"
import BasicInfo from "./BasicInfo"
import Files from "./Files"

import styles from './AddContentForm.module.css'

import Button from "@mui/material/Button"

const INITIAL_DATA = {
	FILES: {
		files: null,
	},
	BASIC_INFO: {
		title: "",
		type: "",
		releaseDate: "",
		description: "",
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
	])

	function handleSubmit(e) {
		e.preventDefault()
		if(!isLastStep) return next()
        alert("Form submitted")
	}

	return (
		<div className="relative bg-white border border-black p-8 rounded-md">
			<form action="" onSubmit={handleSubmit}>
				<div className="position: absolute top-2 right-2">
					{currentStepIndex + 1} / {steps.length}
				</div>
				{step}
				<div className="flex mt-4 gap-2 justify-end">
					{!isFirstStep && (
						<Button variant="contained" onClick={back}>
							Back
						</Button>
					)}
					<Button variant="contained" onClick={next}>
						{isLastStep ? "Upload" : "Next"}
					</Button>
				</div>
			</form>
		</div>
	)
}
