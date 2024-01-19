import Divider from "@mui/material/Divider"
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined"
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice"
import YouTubeIcon from "@mui/icons-material/YouTube"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { styled } from "@mui/material/styles"

import DropDown from "./Upload Components/DropDown.json"

import TagInput from "./Upload Components/TagInput"
import DropDownSelect from "./Upload Components/DropdownSelect"
import InputType from "./Upload Components/InputType"

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
			<div>
				<p className="text-xl font-bold">
					{" "}
					<MusicNoteIcon /> Track details
				</p>
				<TagInput
					label="Tags"
					value={tags}
					onChange={(newTagList) => {
						updateFields({ tags: newTagList })
					}}
				/>
				<TagInput
					label="Genre"
					dropDownList={DropDown.Genres}
					value={genres}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ genre: newTagList })
					}}
				/>
			</div>
			<Divider />
			<div>
				<p className="text-xl font-bold">
					{" "}
					<SentimentSatisfiedAltOutlinedIcon /> Moods
				</p>
				<TagInput
					label="Moods"
					dropDownList={DropDown.Moods}
					value={moods}
					addFunctionality
					onChange={(newTagList) => {
						updateFields({ genres: newTagList })
					}}
				/>
			</div>
			<Divider />

			<div>
				<p className="text-xl font-bold">
					{" "}
					<MonitorHeartOutlinedIcon /> Key & BPM
				</p>

				<div className="flex gap-4">
					<DropDownSelect
						label="Key"
						dropDownList={DropDown.Keys}
						value={keys}
						onChange={(newKey) => {
							updateFields({ keys: newKey })
						}}
					/>

					<InputType
						label="Moods"
						value={bpm}
						onChange={(newBpm) => updateFields({ bpm: newBpm })}
					/>
				</div>
			</div>
			<Divider />

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
			<Divider />
			<div>
				<p className="text-xl font-bold">
					{" "}
					<YouTubeIcon /> Related videos
				</p>
				<div className='my-12'>
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
			<Divider />
		</div>
	)
}
