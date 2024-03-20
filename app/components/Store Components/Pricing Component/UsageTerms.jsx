import MicNoneIcon from "@mui/icons-material/MicNone"
import FilterNoneIcon from "@mui/icons-material/FilterNone"
import CellTowerIcon from "@mui/icons-material/CellTower"
import VideocamIcon from "@mui/icons-material/Videocam"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"

export default function UsageTerms({ selected }) {
	const icons = [
		<MicNoneIcon />,
		<FilterNoneIcon />,
		<CellTowerIcon />,
		<VideocamIcon />,
		<ReceiptLongIcon />,
	]

	const terms = {
		basic: [
			"used for recording",
			"distribute up to 1,000 copies",
			"25,000 online audio streams",
			"1 music video",
		],

		premium: [
			"used for recording",
			"distribute up to 10,000 copies",
			"300,000 online audio streams",
			"1 music video",
		],

		exclusive: [
			"used for recording",
			"distribute unlimited copies",
			"unlimited online audio streams",
			"unlimited music videos",
			"radio broadcasting rights",
		],
	}

	const selectedTerms = terms[selected] || []

	return (
		<ul className="grid grid-cols-3 gap-4">
			{selected &&
				selectedTerms.map((t, index) => (
					<li key={index} className="text-text-secondary text-sm">
						<span className="flex items-center gap-2">
							{icons[index]} {t.toUpperCase()}
						</span>
					</li>
				))}
		</ul>
	)
}
