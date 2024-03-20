"use client"

import TextField from "@mui/material/TextField"
import SendIcon from "@mui/icons-material/Send"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { useState } from "react"
import { submitComment } from "@/app/actions/submitComment"
import FollowModal from "../../Like Button/FollowModal"

export default function CommentInput({ productId, session }) {
	const [comment, setComment] = useState("")
	const [openModal, setOpenModal] = useState(false)

	async function handleSubmit(formData) {
		if (!session) {
			setOpenModal(true)

			return
		}

		await submitComment(formData)
		setComment("")
	}

	return (
		<>
			{openModal && (
				<FollowModal
					openModal={openModal}
					setModal={setOpenModal}
					prompt={"comment"}
				/>
			)}
			<form action={handleSubmit} className="mt-4">
				<div className="flex items-center gap-2">
					<AccountCircle
						fontSize="large"
						style={{ marginRight: "8px" }}
					/>
					<TextField
						style={{ paddingBottom: "10px" }}
						variant="standard"
						name="comment"
						label="Leave a comment..."
						fullWidth
						inputProps={{ maxLength: 250 }}
						multiline={true}
						value={comment}
						onChange={(e) => {
							setComment(e.target.value)
						}}
					/>
					<input
						className="hidden"
						name="product_id"
						value={productId || ""}
						readOnly={true}
					/>
					<input
						className="hidden"
						name="user_id"
						type="text"
						value={session?.user.id || ""}
						readOnly={true}
					/>
					<input
						className="hidden"
						name="user_email"
						type="text"
						value={session?.user.email || ""}
						readOnly={true}
					/>
					<IconButton
						disabled={!comment}
						type="submit"
						style={{ display: "flex", alignSelf: "center" }}
					>
						<Tooltip title="Submit Comment">
							<SendIcon />
						</Tooltip>
					</IconButton>
				</div>
			</form>
		</>
	)
}
