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
import Divider from "@mui/material/Divider"

import DropDown from "./Upload Components/DropDown.json"

import TagInput from "./Upload Components/TagInput"

export default function MetaData({
	tags,
	genres,
	moods,
	keys,
	bpm,
	instruments,
	videoLink,
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
				<p className="text-lg font-bold">
					{" "}
					<MusicNoteIcon /> Track details
				</p>
				<TagInput
					name="tags"
					label="Tags"
					hashtag={true}
					disabled={false}
					value={tags}
					onChange={(newTagList) => {
						updateFields({ tags: newTagList })
					}}
				/>
				<TagInput
					name="genres"
					label="Genre"
					dropDownList={DropDown.Genres}
					value={genres}
					disabled={false}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ genres: newTagList })
					}}
				/>
			</div>
			<Divider />

			<div>
				<p className="text-lg font-bold">
					{" "}
					<SentimentSatisfiedAltOutlinedIcon /> Moods
				</p>
				<TagInput
					name="moods"
					label="Moods"
					dropDownList={DropDown.Moods}
					value={moods}
					disabled={false}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ moods: newTagList })
					}}
				/>
			</div>
			<Divider />
			<div>
				<p className="text-lg font-bold">
					{" "}
					<KeyboardVoiceIcon /> Instruments & Vocals
				</p>
				<TagInput
					name="instruments"
					label="Instruments"
					value={instruments}
					disabled={false}
					dropDownList={DropDown.Instruments}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ instruments: newTagList })
					}}
				/>
			</div>
			<Divider />

			<div className="flex flex-col gap-4">
				<p className="text-lg font-bold">
					{" "}
					<MonitorHeartOutlinedIcon /> Key & BPM
				</p>

				<div className="flex gap-4">
					<TextField
						name="keys"
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
						name="bpm"
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
			<Divider />

			<div>
				<p className="text-lg font-bold mb-2">
					{" "}
					<YouTubeIcon /> Related videos
				</p>

				<TextField
					name="title"
					className="col-span-2"
					fullWidth
					size="small"
					id="videoLink"
					label="YouTube Link (optional)"
					type="text"
					value={videoLink}
					onChange={(e) => {
						updateFields({ videoLink: e.target.value })
					}}
				/>
			</div>
		</div>
	)
}
