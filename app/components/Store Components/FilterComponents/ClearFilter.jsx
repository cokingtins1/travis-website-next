import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"

export default function ClearFilter({ value, callBack }) {

    const handleDelete = () => {
        callBack(value)
    }

	return (
		<Button
			color="warning"
			size="small"
			sx={{
				whiteSpace: "nowrap",
				fontSize: "0.75rem",
			}}
			onClick={handleDelete}
		>
			<CloseIcon
				sx={{
					fontSize: "0.75rem",
					marginTop: "2.5px",
					marginRight: "2px",
				}}
			/>
			<span className="pt-1">{value}</span>
		</Button>
	)
}
