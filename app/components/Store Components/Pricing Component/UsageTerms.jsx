import MicNoneIcon from "@mui/icons-material/MicNone";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import CellTowerIcon from "@mui/icons-material/CellTower";
import VideocamIcon from "@mui/icons-material/Videocam";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RemoveIcon from "@mui/icons-material/Remove";
import GroupsIcon from "@mui/icons-material/Groups";
import RadioIcon from "@mui/icons-material/Radio";

export default function UsageTerms({ selected }) {
  //selected = "default" || "basic" || "premium" || "exclusive"

  const commonIcons = [
    <MicNoneIcon key="mic" />,
    <FilterNoneIcon key="filter" />,
    <CellTowerIcon key="tower" />,
    <VideocamIcon key="video" />,
    <ReceiptLongIcon key="receipt" />,
    <GroupsIcon key="groups" />,
    <RadioIcon key="radio" />,
  ];

  const terms = {
    default: ["select a license to view terms"],
    basic: {
      text: [
        "used for recording",
        "distribute up to 3,000 copies",
        "500,000 online audio streams",
        "1 music video",
        "for profit live performances",
        "radio broadcasting rights (2 stations)",
      ],
      icon: commonIcons,
    },

    premium: {
      text: [
        "used for recording",
        "distribute up to 10,000 copies",
        "500,000 online audio streams",
        "1 music video",
        "for profit live performances",
        "radio broadcasting rights (2 stations)",
      ],
      icon: commonIcons,
    },

    exclusive: {
      text: [
        "used for recording",
        "distribute unlimited copies",
        "unlimited online audio streams",
        "unlimited music videos",
        "for profit live performances",
        "radio broadcasting rights (2 stations)",
      ],
      icon: commonIcons,
    },
  };

  const selectedTerms = terms[selected] || null;

  return (
    <ul className="flex flex-col md:grid grid-cols-3 gap-4">
      {selected !== "default" &&
        selectedTerms?.text.map((t, index) => (
          <li key={index} className="text-text-secondary text-sm">
            <span className="flex items-center gap-2">
              {selectedTerms.icon[index]} {t.toUpperCase()}
            </span>
          </li>
        ))}
    </ul>
  );
}
