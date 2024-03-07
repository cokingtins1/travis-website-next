"use client"

import TextField from "@mui/material/TextField"
import SendIcon from "@mui/icons-material/Send"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import AccountCircle from "@mui/icons-material/AccountCircle"

import { useState } from "react"
import Comment from "./Comment"
import { submitComment } from "@/app/actions/submitComment"

export default function Comments({ productId, userId, session, comments }) {
	const [comment, setComment] = useState("")

	async function handleSubmit(formData) {
		if (!session) return

		await submitComment(formData)
		setComment("")
	}

	return (
		<div className="bg-bg-elevated rounded-xl h-[550px] p-4">
			<p className="text-xl">Comments</p>

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

			<div className="flex flex-col gap-4 mt-8">
				<Comment />
				<Comment />
				<Comment />
			</div>
		</div>
	)
}
