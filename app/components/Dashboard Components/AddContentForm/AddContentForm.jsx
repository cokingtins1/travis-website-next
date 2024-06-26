"use client";
// AddContentForm.jsx
import { useEffect, useState } from "react";

import useMultipleStepForm from "./useMultipleStepForm";
import BasicInfo from "./BasicInfo";
import Files from "./Files";
import dayjs from "dayjs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

import { toast } from "react-toastify";

import MetaData from "./MetaData";
import Pricing from "./Pricing";
import { Button as UIButton } from "../../UI/Button";
import { createFormData } from "@/libs/utils";
import AudioDrawer from "../../Audio/AudioDrawer";
import { useAudio } from "@/libs/contexts/AudioContext";
import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SubmitModal from "../../UI/SubmitModal";
import { clearTempUploads } from "@/app/actions/clearTempUploads";

const INITIAL_DATA = {
	MP3_storage_url: null,
	MP3_storage_key: null,
	MP3_storage_name: null,
	MP3_storage_size: null,

	WAV_storage_url: null,
	WAV_storage_key: null,
	WAV_storage_name: null,
	WAV_storage_size: null,

	STEM_storage_url: null,
	STEM_storage_key: null,
	STEM_storage_name: null,
	STEM_storage_size: null,

	image_storage_url: null,
	image_storage_key: null,
	image_storage_name: null,
	image_storage_size: null,

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

	basic: false,
	basicPrice: 35,
	basicPriceId: crypto.randomUUID(),
	premium: false,
	premiumPrice: 125,
	premiumPriceId: crypto.randomUUID(),
	exclusive: false,
	exclusivePrice: 350,
	exclusivePriceId: crypto.randomUUID(),

	free: true,
};

export default function AddContentForm({ filesFromStorage, tempUploads }) {
	const [data, setData] = useState(INITIAL_DATA);
	const [tabValue, setTabValue] = useState(0);

	const [fileLoading, setFileLoading] = useState(false);
	const [dataLoading, setDataLoading] = useState(false);
	const [error, setError] = useState([]);
	const [validating, setValidating] = useState(false);

	const router = useRouter();

	const { audioSrcId, buttonId, clearAudio } = useAudio();

	useEffect(() => {
		clearAudio();
	}, []);

	useEffect(() => {
		const fileError = "You must upload a .mp3 file to publish this product";
		if (!data.MP3_storage_url) {
			addError(fileError);
		} else {
			removeError(fileError);
		}

		const imageError =
			"You must upload a product image to publish this product";
		if (!data.image_storage_url) {
			addError(imageError);
		} else {
			removeError(imageError);
		}
	}, [
		data.MP3_storage_url,
		data.WAV_storage_url,
		data.STEM_storage_url,
		data.image_storage_url,
	]);

	const indices = [
		{ index: 0, value: "Upload Files" },
		{ index: 1, value: "Basic Info" },
		{ index: 2, value: "Meta Data" },
		{ index: 3, value: "Pricing" },
	];

	function updateFields(fields) {
		setData((prev) => {
			return { ...prev, ...fields };
		});
	}
	const addError = (error) => {
		setError((prevErrors) => {
			if (!prevErrors.includes(error)) {
				return [...prevErrors, error];
			} else {
				return prevErrors;
			}
		});
	};
	const removeError = (errorToRemove) => {
		setError((prevErrors) => {
			if (prevErrors && !prevErrors.includes(errorToRemove))
				return prevErrors;

			return prevErrors.filter((error) => error !== errorToRemove);
		});
	};

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
		<Files
			key="files"
			{...data}
			updateFields={updateFields}
			filesFromStorage={filesFromStorage}
			tempUploads={tempUploads}
		/>,
		<LocalizationProvider key="localization" dateAdapter={AdapterDayjs}>
			<BasicInfo key="basicInfo" {...data} updateFields={updateFields} />,
		</LocalizationProvider>,
		<MetaData key="metaData" {...data} updateFields={updateFields} />,
		<Pricing key="pricing" {...data} updateFields={updateFields} />,
	]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!isLastStep) return next();

		setValidating(true);

		if (error.length > 0) {
			return;
		} else setValidating(false);

		const formData = createFormData(data);

		try {
			setDataLoading(true);

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
			);
			if (res.ok) {
				setDataLoading(false);
				router.push("/dashboard");
			} else {
				addError("There was an error uploading the product data");
				setDataLoading(false);
				throw new Error(
					"There was an error uploading the product data"
				);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function handleAbort() {
		const deleteKeys = [
			data.MP3_storage_key,
			data.WAV_storage_key,
			data.STEM_storage_key,
			data.image_storage_key,
		];

		await clearTempUploads(deleteKeys);

		router.push("/dashboard");
	}

	return (
		<>
			<div className="w-full bg-bg-elevated border border-black p-4 rounded-md ">
				<form>
					<div className="flex flex-col">
						<div className="flex justify-between">
							<Tabs
								onChange={(e) => {
									setTabValue(e.target.value);
								}}
								value={tabValue}
							>
								{indices.map((step) => (
									<Tab
										key={step.index}
										label={step.value}
										onClick={() => {
											setTabValue(step.index);
											goTo(step.index);
										}}
									/>
								))}
							</Tabs>

							<SubmitModal
								variant="abort"
								callback={(e) => {
									handleAbort(e);
								}}
							/>
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
						<div
							className={`flex ${
								validating ? "justify-between" : "justify-end"
							} items-end`}
						>
							{validating && error && (
								<ul className="flex flex-col">
									{error.map((error, index) => (
										<li
											key={index}
											className="list-none text-sm text-text-error pb-2"
										>
											{error}
										</li>
									))}
								</ul>
							)}
							<div className="flex mt-4 gap-2 ">
								{(fileLoading || dataLoading) && (
									<p className="text-text-secondary italic">
										Uploading files...
									</p>
								)}
								{!isFirstStep && (
									<UIButton
										size="lg"
										onClick={() => {
											back();
											setTabValue(currentStepIndex - 1);
										}}
										type="button"
									>
										Back
									</UIButton>
								)}
								<UIButton
									size="lg"
									disabled={fileLoading || dataLoading}
									type={isLastStep ? "submit" : "button"}
									onClick={(e) => {
										handleSubmit(e);
										!isLastStep &&
											setTabValue(currentStepIndex + 1);
									}}
								>
									{isLastStep ? "Upload" : "Next"}
								</UIButton>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
