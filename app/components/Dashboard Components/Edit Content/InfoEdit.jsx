"use client";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import { styled } from "@mui/material/styles";
import beatKitImage from "@/public/beatKitImage.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import TagInput from "../AddContentForm/Upload Components/TagInput";
import { toast } from "react-toastify";
import PricingSwitch from "../AddContentForm/Upload Components/PricingSwitch";
import SubmitModal from "../../UI/SubmitModal";
import { createFormData } from "@/libs/utils";
import { useAudio } from "@/libs/contexts/AudioContext";
import AudioDrawer from "../../Audio/AudioDrawer";
import Divider from "@mui/material/Divider";
import UploadFile from "../AddContentForm/Upload Components/UploadFile";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function InfoEdit({
	product,
	productFiles,
	pricing,
	audioSources,
}) {
	const INITIAL_DATA = {
		MP3_file: productFiles.basic.file_url || null,
		MP3_fileName: productFiles.basic.storage_name || null,
		MP3_fileSize: productFiles.basic.storage_size || null,
		MP3_update: !!productFiles.basic.file_url,

		WAV_file: productFiles.premium.file_url || null,
		WAV_fileName: productFiles.premium.storage_name || null,
		WAV_fileSize: productFiles.premium.storage_size || null,
		WAV_update: !!productFiles.premium.file_url,

		STEM_file: productFiles.exclusive.file_url || null,
		STEM_fileName: productFiles.exclusive.storage_name || null,
		STEM_fileSize: productFiles.exclusive.storage_size || null,
		STEM_update: !!productFiles.exclusive.file_url,

		productImage: productFiles.imageFile,
		productImageSrc: productFiles.imageSrc,

		title: product.title || "",
		description: product.description || "",
		type: product.type || "",
		tags: product.tags || [],
		genres: product.genres || [],
		moods: product.moods || [],
		instruments: product.instruments || [],
		videoLink: product.video_link || "",
		keys: product.keys || "",
		bpm: product.bpm,

		basic: pricing.basic?.isActive || false,
		basicPrice: pricing.basic?.price || 30,
		basicPriceId: crypto.randomUUID(),
		basicFileDelete: false,

		premium: pricing.premium?.isActive || false,
		premiumPrice: pricing.premium?.price || 150,
		premiumPriceId: crypto.randomUUID(),
		premiumFileDelete: false,

		exclusive: pricing.exclusive?.isActive || false,
		exclusivePrice: pricing.exclusive?.price || 350,
		exclusivePriceId: crypto.randomUUID(),
		exclusiveFileDelete: false,

		free: product.free || false,
	};

	const [data, setData] = useState(INITIAL_DATA);
	const [editing, setEditing] = useState(false);
	const [dataLoading, setDataLoading] = useState(false);
	const [imageErr, setImageErr] = useState("");
	const router = useRouter();

	const { audioSrcId, clearAudio, buttonId } = useAudio();

	useEffect(() => {
		clearAudio();
	}, []);

	function abortEditing(e) {
		setEditing(!editing);
		setData(INITIAL_DATA);
	}

	async function deleteProduct() {
		try {
			setDataLoading(true);
			const res = await toast.promise(
				fetch("/api/deleteProduct", {
					method: "DELETE",
					body: JSON.stringify(product.product_id),
				}),
				{
					pending: "Deleting product",
					success: "Product deleted successfully",
					error: "Error deleting product",
				}
			);

			if (res.ok) {
				setDataLoading(false);
				setEditing(false);
				router.push("/dashboard");
			} else {
				setDataLoading(false);
				throw new Error("There was an error updating the files");
			}
		} catch (error) {
			console.log(error);
		}
		revalidatePath("/");
	}

	async function handleSubmit(e) {
		e.preventDefault();

		let formData;
		if (process.env.NODE_ENV !== "development") {
			const { MP3_file, WAV_file, STEM_file, ...dataNoFile } = data;
			formData = createFormData(
				dataNoFile,
				"product_id",
				product.product_id
			);
		} else {
			formData = createFormData(data, "product_id", product.product_id);
		}

		try {
			setDataLoading(true);
			const res = await toast.promise(
				fetch("/api/updateData", {
					method: "PUT",
					body: formData,
				}),
				{
					pending: "Upadating fields",
					success: "Fields updated successfully",
					error: "Error updating filds",
				}
			);

			if (res.ok) {
				setDataLoading(false);
				setEditing(false);
			} else {
				setDataLoading(false);
				throw new Error("There was an error updating the files");
			}
		} catch (error) {
			console.log(error);
		}
		// revalidatePath("/")
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
	});

	const contentType = [
		{ value: "Beat" },
		{ value: "Drum Kit" },
		{ value: "Melody" },
	];

	function updateFields(fields) {
		setData((prev) => {
			return { ...prev, ...fields };
		});
	}

	function handleChange(e) {
		const file = e.target.files[0];
		const fileIsImage = file.type.split("/")[0] === "image";

		if (!fileIsImage) {
			setImageErr("Please select a valid image file type");
			return;
		} else {
			setImageErr("");
		}

		if (file) {
			updateFields({
				productImage: file,
				productImageSrc: URL.createObjectURL(file),
			});
		}
	}

	const DropDown = {
		Genres: [
			"Aggressive",
			"Angry",
			"Ballad",
			"Club",
			"Country",
			"Dance",
			"Deep",
			"Dirty South",
			"Dubstep",
			"Emotional",
			"Epic",
			"Gangster",
			"Guitar",
			"Happy",
			"Hard",
			"Hip Hop",
			"Live",
			"Melodic",
			"Orchestral",
			"Piano",
			"Pop",
			"R&B",
			"Rap",
			"Reggae",
			"Rock",
			"Sad",
			"Sampled",
			"Sexy",
			"Slow",
			"Smooth",
			"Street",
			"Trance",
			"Underground",
			"Uptempo",
			"Urban",
			"West Coast",
		],

		Moods: [
			"Action",
			"Adventurous",
			"Aggressive",
			"Airy",
			"Ambient",
			"Angelic",
			"Angry",
			"Anthemic",
			"Anxious",
			"Arcade",
			"Atmospheric",
			"Beats",
			"Beats To Rap To",
			"Beau",
			"Beautiful",
			"Black",
			"Bouncy",
			"Bright",
			"Care Free",
			"Carefree",
			"Caribbean",
			"Catchy",
			"Charm",
			"Cheeful",
			"Cheerful",
			"Childlike",
			"Chilled",
			"Chilling",
			"Cinematic",
			"Clapping",
			"Classic",
			"Clumsy",
			"Cold",
			"Colorful",
			"Confident",
			"Contemplative",
			"Cool",
			"Cool Vibe",
			"Corporate",
			"Cosy",
			"Courageous",
			"Creepy",
			"Cultured",
			"Cute",
			"Dancing",
			"Danger",
			"Daring",
			"Dark",
			"Deep",
			"Determined",
			"Digital",
			"Dirty",
			"Distant",
			"Downtempo",
			"Downtown",
			"Dramatic",
			"Dreamy",
			"Driving",
			"Dynamic",
			"Eager",
			"Earthy",
			"Edgy",
			"Eerie",
			"Electro",
			"Emotional",
			"Empowering",
			"Encouraging",
			"Energetic",
			"Epic",
			"Ethereal",
			"Euphoric",
			"Evolving",
			"Exciting",
			"Exotic",
			"Exotica",
			"Expansive",
			"Experimental",
			"Experimental,Dark",
			"Family",
			"Feel Good",
			"Festive",
			"Flim",
			"Frantic",
			"Free",
			"Frightening",
			"Frisky",
			"Fun",
			"Futuristic",
			"Gentle",
			"Glamorous",
			"Glitchy",
			"Good Time",
			"Groove",
			"Groovy",
			"Happy",
			"Happy Birthday",
			"Hard",
			"Haunting",
			"Heavy",
			"Holiday",
			"Homely",
			"Hopeful",
			"Humorous",
			"Hypnotic",
			"Industrial",
			"Inquisitive",
			"Inspirational",
			"Inspiring",
			"Intense",
			"Intimate",
			"Laid Back",
			"Light",
			"Lonely",
			"Lost",
			"Love",
			"Lustful",
			"Magical",
			"Meditative",
			"Melancholic",
			"Mellow",
			"Melodic",
			"Moody",
			"Motivational",
			"Mournful",
			"Mysterious",
			"Mystical",
			"Nervous",
			"Nostalgic",
			"Off Beat",
			"Ominous",
			"Optimistic",
			"Organic",
			"Otherwordly",
			"Otherworldly",
			"Passionate",
			"Peaceful",
			"Pensive",
			"Playful",
			"Poetic",
			"Positive",
			"Powerful",
			"Quirky",
			"Rebellious",
			"Reflective",
			"Regal",
			"Rejected",
			"Relaxed",
			"Relaxing",
			"Relentless",
			"Religious",
			"Restless",
			"Retro",
			"Reverb",
			"Romantic",
			"Royal",
			"Rural",
			"Rustic",
			"Sad",
			"Scary",
			"Sentimental",
			"Sexy",
			"Smoky",
			"Smooth",
			"Soft",
			"Solemn",
			"Sombre",
			"Songs",
			"Sophisticated",
			"Soulful",
			"Sparse",
			"Street",
			"Sub",
			"Summer",
			"Sunny",
			"Sunshine",
			"Suspense",
			"Suspenseful",
			"Swinging",
			"Tech",
			"Techno For New Media",
			"Tense",
			"Tension",
			"Terror",
			"Thoughtful",
			"Triumphant",
			"Understated",
			"Upbeat",
			"Uplifting",
			"Uptempo",
			"Urban",
			"Urgent",
			"Utopian",
			"Vicious",
			"Vintage",
			"Vulnerable",
			"Warm",
			"WarmMagical",
			"Wild",
			"World",
			"Yearnful",
			"Yesteryear",
			"Youth",
		],

		Keys: ["None", "CM", "GM", "DM", "AM", "EM", "B", "FSM", "CSM"],

		Instruments: [
			"Accordion",
			"Banjo",
			"Bass drum",
			"Bass guitar",
			"Bassoon",
			"Bell",
			"Bongo drums",
			"Bugle",
			"Celesta",
			"Cello",
			"Clap box",
			"Clarinet",
			"Comet",
			"Conga drums",
			"Cornet",
			"Cymbal",
			"Damru",
			"Dholak",
			"Drum pad",
			"Drums",
			"Ektara",
			"Electric guitar",
			"Electronic drums",
			"Euphonium",
			"Flute",
			"French horn",
			"Gong",
			"Gramophone",
			"Guitar",
			"Gu-zheng",
			"Harmonica",
			"Harmonium",
			"Harp",
			"Keyboard",
			"Lute",
			"Maracas",
			"Marimba",
			"Mouth organ",
			"Mridangam",
			"Oboe",
			"Oud",
			"Piano",
			"Piccolo",
			"Pipe organ",
			"Pungi",
			"Sarangi",
			"Sarod",
			"Saxophone",
			"Shehnai",
			"Sitar",
			"Snare drum",
			"Spinet",
			"Tabla",
			"Tambourine",
			"Triangle",
			"Trombone",
			"Trumpet",
			"Tuba",
			"Tubular chimes",
			"Ukulele",
			"Veena",
			"Violin",
			"Xylophone",
			"Yueqin",
		],
	};

	return (
		<form>
			<div className="flex justify-end gap-4 pt-4 pr-4">
				{editing || (
					<SubmitModal variant="delete" callback={deleteProduct} />
				)}
				{!editing ? (
					<Button
						disabled={dataLoading}
						type="button"
						onClick={(e) => {
							setEditing(true);
							e.preventDefault();
						}}
					>
						Edit Fields
					</Button>
				) : (
					<>
						<Button
							color="warning"
							type="button"
							onClick={abortEditing}
						>
							Discard Changes
						</Button>
						<SubmitModal
							variant="update"
							callback={(e) => {
								handleSubmit(e);
							}}
						/>
					</>
				)}
			</div>
			<p className="text-xl font-bold text-center mb-4">Product Files</p>
			<Divider variant="middle" />
			<div className={`max-w-[1200px] flex flex-col p-4`}>
				<div className={`flex flex-col gap-4 lg:flex-row `}>
					<div
						className={`flex flex-col items-center justify-center mb-4`}
					>
						<div className="relative w-[250px] h-[300px]">
							<Image
								alt=""
								src={
									data.productImageSrc
										? data.productImageSrc
										: beatKitImage
								}
								style={{ objectFit: "cover" }}
								fill={true}
								sizes="(max-width: 430px), 300px "
							/>
						</div>
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
										handleChange(e);
									}}
									type="file"
								/>
							</label>
						</Button>
						{imageErr && (
							<span className="text-sm text-text-error">
								{imageErr}
							</span>
						)}
					</div>
					<div className="flex flex-col flex-1 gap-4">
						<UploadFile
							type="MP3"
							setAudioSrc={true}
							audioSource={audioSources.MP3}
							fileProps={data.MP3_file}
							fileNameProps={data.MP3_fileName}
							fileSizeProps={data.MP3_fileSize}
							editing={editing}
							updateFields={(fields) =>
								updateFields({
									MP3_file: fields.file,
									MP3_fileName: fields.fileName,
									MP3_fileSize: fields.fileSize,
									basic: fields.switch,
									basicPriceId: fields.id,
									basicFileDelete: fields.delete,
								})
							}
						/>

						<UploadFile
							setAudioSrc={true}
							type="WAV"
							audioSource={audioSources.WAV}
							fileProps={data.WAV_file}
							fileNameProps={data.WAV_fileName}
							fileSizeProps={data.WAV_fileSize}
							editing={editing}
							updateFields={(fields) =>
								updateFields({
									WAV_file: fields.file,
									WAV_fileName: fields.fileName,
									WAV_fileSize: fields.fileSize,
									premium: fields.switch,
									premiumPriceId: fields.id,
									premiumFileDelete: fields.delete,
								})
							}
						/>
						<UploadFile
							setAudioSrc={true}
							type="STEM"
							fileProps={data.STEM_file}
							fileNameProps={data.STEM_fileName}
							fileSizeProps={data.STEM_fileSize}
							editing={editing}
							updateFields={(fields) =>
								updateFields({
									STEM_file: fields.file,
									STEM_fileName: fields.fileName,
									STEM_fileSize: fields.fileSize,
									exclusive: fields.switch,
									exclusivePriceId: fields.id,
									exclusiveFileDelete: fields.delete,
								})
							}
						/>
					</div>
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
				<div className={`flex flex-col gap-4 mt-8`}>
					<p className="text-xl font-bold text-center">
						Product Metadata
					</p>
					<Divider />
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
								updateFields({ type: e.target.value });
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
									updateFields({ tags: newTagList });
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
									updateFields({ genres: newTagList });
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
								hashtag={false}
								dropDownList={DropDown.Moods}
								disabled={!editing}
								value={data.moods}
								onChange={(newTagList) => {
									updateFields({ moods: newTagList });
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
									updateFields({ instruments: newTagList });
								}}
							/>
						</div>
					</div>
					<div className="flex items-center">
						<label
							htmlFor="instruments"
							className=" w-1/5 text-right pr-4"
						>
							Related videos:
						</label>
						<div className="flex-1">
							<TextField
								name="title"
								className="col-span-2"
								fullWidth
								size="small"
								id="videoLink"
								label="YouTube Link (optional)"
								disabled={!editing}
								type="text"
								value={data.videoLink}
								onChange={(e) => {
									updateFields({ videoLink: e.target.value });
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
								updateFields({ keys: e.target.value });
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
								updateFields({
									bpm: e.target.value,
								});
							}}
						/>
					</div>
					<div>
						<div className="flex items-start flex-col gap-4 pl-16">
							<PricingSwitch
								key={data.basicPriceId}
								width="w-full"
								disabled={!editing}
								nameSwitch="basic"
								namePrice="basicPrice"
								defaultChecked={data.MP3_file}
								file={data.MP3_file}
								contractTitle={"Basic License"}
								contractSubtext={"MP3"}
								type={"MP3"}
								value={data.basicPrice}
								editing={editing}
								onCheckedChange={(newChecked) => {
									updateFields({
										basic: newChecked,
									});
								}}
								onChange={(newPrice) => {
									updateFields({
										basicPrice: Number(newPrice),
									});
								}}
							/>
							<PricingSwitch
								key={data.premiumPriceId}
								width="w-full"
								disabled={!editing}
								nameSwitch="premium"
								namePrice="premiumPrice"
								defaultChecked={data.WAV_file}
								file={data.WAV_file}
								contractTitle={"Premium License"}
								contractSubtext={"WAV, MP3"}
								value={data.premiumPrice}
								type={"WAV"}
								editing={editing}
								onCheckedChange={(newChecked) => {
									updateFields({
										premium: newChecked,
									});
								}}
								onChange={(newPrice) => {
									updateFields({
										premiumPrice: Number(newPrice),
									});
								}}
							/>
							<PricingSwitch
								key={data.exclusivePriceId}
								width="w-full"
								disabled={!editing}
								nameSwitch="exclusive"
								namePrice="exclusivePrice"
								defaultChecked={data.STEM_file}
								file={data.STEM_file}
								contractTitle={"Exclusive License"}
								contractSubtext={"WAV, MP3, STEMS"}
								value={data.exclusivePrice}
								type={"STEM"}
								editing={editing}
								onCheckedChange={(newChecked) => {
									updateFields({
										exclusive: newChecked,
									});
								}}
								onChange={(newPrice) => {
									updateFields({
										exclusivePrice: Number(newPrice),
									});
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
												updateFields({
													free: !data.free,
												});
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
	);
}
