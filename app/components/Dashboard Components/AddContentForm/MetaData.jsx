import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import InputLabel from "@mui/material/InputLabel"

import { useState } from "react"

export default function MetaData() {
	const [tags, setTags] = useState([""])

	return (
		<FormControl>
			<div className="grid grid-rows-5">
				<div>
					<p className="text-xl font-bold">
						{" "}
						<MusicNoteIcon /> Track details
					</p>
					<p>Tags (up to 3)</p>
				</div>
				<div>Mood</div>
				<div>Keys and BPM</div>
				<div>Instruments & Vocals</div>
				<div>Related Videos</div>
			</div>
		</FormControl>
	)
}
