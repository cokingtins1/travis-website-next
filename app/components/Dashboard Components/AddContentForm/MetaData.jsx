import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined"
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice"
import YouTubeIcon from "@mui/icons-material/YouTube"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { styled } from "@mui/material/styles"
import Divider from '@mui/material/Divider';


import DropDown from "./Upload Components/DropDown.json"

import TagInput from "./Upload Components/TagInput"

export default function MetaData({
	tags,
	genres,
	moods,
	keys,
	bpm,
	instruments,
	updateFields,
}) {
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
	})
	return (
		<div className="grid auto-rows-auto gap-4 pr-2">
			<div className="w-full">
				<p className="text-xl font-bold">
					{" "}
					<MusicNoteIcon /> Track details
				</p>
				<TagInput
					label="Tags"
					hashtag={true}
					disabled={false}
					value={tags}
					onChange={(newTagList) => {
						updateFields({ tags: newTagList })
					}}
				/>
				<TagInput
					label="Genre"
					dropDownList={DropDown.Genres}
					value={genres}
					disabled={false}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ genre: newTagList })
					}}
				/>
			</div>
			<Divider/>

			<div>
				<p className="text-xl font-bold">
					{" "}
					<SentimentSatisfiedAltOutlinedIcon /> Moods
				</p>
				<TagInput
					label="Moods"
					dropDownList={DropDown.Moods}
					value={moods}
					disabled={false}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ genres: newTagList })
					}}
				/>
			</div>
			<Divider/>

			<div className="flex flex-col gap-4">
				<p className="text-xl font-bold">
					{" "}
					<MonitorHeartOutlinedIcon /> Key & BPM
				</p>

				<div className="flex gap-4">
					{/* <DropDownSelect
						label="Key"
						dropDownList={DropDown.Keys}
						value={keys}
						onChange={(newKey) => {
							updateFields({ keys: newKey })
						}}
					/> */}

					<TextField
						sx={{ width: "200px" }}
						size="small"
						id="type"
						label="Key"
						type="text"
						InputLabelProps={{
							shrink: true,
						}}
						select
						value={keys}
						onChange={(e) => {
							updateFields({ keys: e.target.value })
						}}
					>
						{DropDown.Keys.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>

					<TextField
						sx={{ width: "200px" }}
						size="small"
						id="title"
						label="BPM"
						type="text"
						InputLabelProps={{
							shrink: true,
						}}
						value={bpm}
						onChange={(e) => {
							updateFields({ bpm: e.target.value })
						}}
					/>
				</div>
			</div>
			<Divider/>


			<div>
				<p className="text-xl font-bold">
					{" "}
					<KeyboardVoiceIcon /> Instruments & Vocals
				</p>
				<TagInput
					label="Instruments"
					value={instruments}
					dropDownList={DropDown.Instruments}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ instruments: newTagList })
					}}
				/>
			</div>
			<Divider/>
			<div>
				<p className="text-xl font-bold">
					{" "}
					<YouTubeIcon /> Related videos
				</p>
				<div className="my-12">
					<Button
						component="label"
						variant="contained"
						startIcon={<CloudUploadIcon />}
						sx={{ width: "115px", height: "40px" }}
					>
						Upload
						<VisuallyHiddenInput type="file" />
					</Button>
				</div>
			</div>
		</div>
	)
}
