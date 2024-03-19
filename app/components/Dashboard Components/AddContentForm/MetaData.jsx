import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined"
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice"
import YouTubeIcon from "@mui/icons-material/YouTube"

import { styled } from "@mui/material/styles"
import Divider from "@mui/material/Divider"

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
	}

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
