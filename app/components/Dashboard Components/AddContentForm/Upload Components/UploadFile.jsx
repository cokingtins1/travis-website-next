import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"

export default function UploadFile() {
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
		<div className="flex justify-between items-center rounded-lg border border-border-primary p-2">
			<div className="flex gap-2">
				<span className="flex items-center rounded-full border border-border-primary p-2">
					<MusicNoteIcon sx={{ fontSize: 40 }} />
				</span>
				<div>
					<p className="font-semibold">Un-tagged audio</p>
					<p className="text-sm text-text-secondary">
						Upload .mp3 or .wav files only
					</p>
				</div>
			</div>

			<div className="flex gap-2">
				<Button
					component="label"
					variant="contained"
					disabled
					startIcon={<PlayCircleIcon />}
					sx={{ width: "115px", height: "40px" }}
				>
					Play
				</Button>
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
	)
}
