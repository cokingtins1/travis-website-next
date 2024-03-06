"use client"

import TextField from "@mui/material/TextField"
import SendIcon from "@mui/icons-material/Send"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useState } from "react"

export default function Comments({ productId, userId }) {
	const [comment, setComment] = useState("")

	return (
		<div className="bg-bg-elevated rounded-xl h-[300px] p-4">
			<p className="text-xl">Comments</p>

			<form action="" className="mt-4">
				<div className="flex">
					<TextField
						variant="standard"
						label="Leave a comment..."
						fullWidth
						value={comment}
						onChange={(e) => {
							setComment(e.target.value)
						}}
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
		</div>
	)
}
