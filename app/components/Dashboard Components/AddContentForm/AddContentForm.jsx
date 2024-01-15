"use client"

import { useState } from "react"

import useMultipleStepForm from "./useMultipleStepForm"
import BasicInfo from "./BasicInfo"
import Files from "./Files"

import Button from "@mui/material/Button"

const INITIAL_DATA = {
	FILES: {
		files: null,
	},
	BASIC_INFO: {
		title: "",
		type: "",
		releaseDate: "",
		Description: "",
	},
}

export default function AddContentForm() {
	const [data, setData] = useState(INITIAL_DATA)

	const {
		steps,
		currentStepIndex,
		step,
		isFirstStep,
		isLastStep,
		back,
		next,
	} = useMultipleStepForm([<Files {...data} />, <BasicInfo {...data} />])

	function handleSubmit(e) {
		e.preventDefault()
		next()
	}

	return (
		<div className="relative bg-white border border-black p-8 m-4 rounded-md w-3/6 h-3/6">
			<form action="">
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
