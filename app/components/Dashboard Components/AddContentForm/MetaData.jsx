import Divider from "@mui/material/Divider"
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined"

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
	updateFields,
}) {
	return (
		<div className="grid auto-rows-auto gap-4">
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
						onChange={(newBpm) => {
							updateFields({ bpm: newBpm })
						}}
					/>
				</div>
			</div>
			<div>Instruments & Vocals</div>
			<div>Related Videos</div>
		</div>
	)
}
