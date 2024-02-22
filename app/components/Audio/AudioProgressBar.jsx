import { formatDurationDisplay } from "@/libs/utils"
import Slider from "@mui/material/Slider"

export default function AudioProgressBar({
	duration,
	currentProgress,
	buffered,
	onChange,
	...rest
}) {
	const durationDisplay = formatDurationDisplay(duration)
	const elapsedDisplay = formatDurationDisplay(currentProgress)
	const progressBarWidth = isNaN(currentProgress / duration)
		? 0
		: currentProgress / duration
	const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration

	const progressStyles = {
		"--progress-width": progressBarWidth,
		"--buffered-width": bufferedWidth,
		"--buffered-left": 0,
	}

	function valueLabelFormat(value) {
		return formatDurationDisplay(value)
	}

	return (
		<div className="hidden lg:flex items-center gap-4">
			<span className="text-text-secondary text-sm w-[45px]">
				{elapsedDisplay}
			</span>
			<Slider
				sx={{ width: 200, color: "#ffeec2" }}
				min={0}
				max={duration}
				value={currentProgress}
				onChange={onChange}
				valueLabelFormat={valueLabelFormat}
				valueLabelDisplay="auto"
			/>

			<span className="text-text-secondary text-sm w-[45px]">
				{durationDisplay}
			</span>
		</div>
	)
}
