import MicNoneIcon from "@mui/icons-material/MicNone";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import CellTowerIcon from "@mui/icons-material/CellTower";
import VideocamIcon from "@mui/icons-material/Videocam";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RemoveIcon from "@mui/icons-material/Remove";

export default function UsageTerms({ selected }) {
	const icons = [
		{ key: 0, value: <MicNoneIcon /> },
		{ key: 1, value: <FilterNoneIcon /> },
		{ key: 2, value: <CellTowerIcon /> },
		{ key: 3, value: <VideocamIcon /> },
		{ key: 4, value: <ReceiptLongIcon /> },
		{ key: 5, value: <RemoveIcon /> },
	];

	const terms = {
		default: ["select a license to view terms"],
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
			"beat removed from store",
		],
	};

	const selectedTerms = terms[selected] || null;

	return (
		<ul className="flex flex-col md:grid grid-cols-3 gap-4">
			{selected &&
				selectedTerms &&
				selectedTerms.map((t, index) => (
					<li key={index} className="text-text-secondary text-sm">
						<span className="flex items-center gap-2">
							{selected !== "default" && icons[index].value} {t.toUpperCase()}
						</span>
					</li>
				))}
		</ul>
	);
}
