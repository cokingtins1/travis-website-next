"use client"
// AddContentForm.jsx
import { useState } from "react"

import useMultipleStepForm from "./useMultipleStepForm"
import BasicInfo from "./BasicInfo"
import Files from "./Files"
import dayjs from "dayjs"

import styles from "./AddContentForm.module.css"

import Button from "@mui/material/Button"
import MetaData from "./MetaData"

const INITIAL_DATA = {
	files: null,
	title: "",
	type: "",
	releaseDate: dayjs(),
	description: "",
	tags:"",
	genres:"",
	moods:"",
	keys:"",
	bpm:"",
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
	])

	function handleSubmit(e) {
		e.preventDefault()
		if (!isLastStep) return next()
		alert("Form submitted")
	}

	console.log(data)

	return (
		<>
			<div className="relative bg-white border border-black p-4 rounded-md ">
				<form action="" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<div className="flex self-end m-1">
							{currentStepIndex + 1} / {steps.length}
						</div>
						<div className="h-[32rem]">{step}</div>
						<div className="flex mt-4 gap-2 self-end ">
							{!isFirstStep && (
								<Button
									sx={{ width: 100 }}
									variant="contained"
									onClick={back}
								>
									Back
								</Button>
							)}
							<Button
								sx={{
									width: 100,
									backgroundColor: isLastStep
										? "green"
										: "default",
								}}
								variant="contained"
								onClick={next}
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
