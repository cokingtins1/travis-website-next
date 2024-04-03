import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function SubmitModal({ variant, callback }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	let btnDisplay;
	let modalHeader;
	let modalText;
	let color;
	switch (variant) {
		case "update":
			color = "success";
			btnDisplay = "submit changes";
			modalHeader = "Update fields";
			modalText = "Are you sure you want to submit changes?";
			break;
		case "delete":
			color = "error";
			btnDisplay = "delete product";
			modalHeader = "Delete Product";
			modalText =
				"Are you sure you want to delete this product? This action cannot be undone.";
			break;
		case "abort":
			color = "warning";
			btnDisplay = "cancel";
			modalHeader = "Cancel Content Creation";
			modalText = "Are you sure you want to go back?";
			break;
		default:
			btnDisplay = "submit";
	}

	return (
		<div>
			<Button
				color={color}
				variant="outlined"
				type="button"
				onClick={handleOpen}
			>
				{btnDisplay}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						{modalHeader}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{modalText}
					</Typography>

					<div className="flex justify-center">
						<Button
							type={variant === "abort" ? "button" : "submit"}
							onClick={(e) => {
								callback(e);
								setOpen(false);
							}}
						>
							Yes
						</Button>
						<Button onClick={handleClose}>No</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
