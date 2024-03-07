"use client"

import TextField from "@mui/material/TextField"
import SendIcon from "@mui/icons-material/Send"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { useState } from "react"
import { submitReply } from "@/app/actions/submitReply"

export default function ReplyInput({ session, ...replyProps }) {
	const [reply, setReply] = useState("")

	async function handleSubmit(formData) {
		if (!session) return

		await submitReply(formData)
		setReply("")
	}

	return (
		<form action={handleSubmit} className="w-[300px] md:w-[500px]">
			<div className="flex items-center gap-2">
				<AccountCircle
					fontSize="large"
					style={{ marginRight: "8px" }}
				/>
				<TextField
					style={{ paddingBottom: "10px" }}
					variant="standard"
					name="reply"
					label="Add a reply..."
					fullWidth
					inputProps={{ maxLength: 250 }}
					multiline={true}
					value={reply}
					onChange={(e) => {
						setReply(e.target.value)
					}}
				/>
				{Object.entries(replyProps).map(([key, value]) => (
					<input
						key={key}
						className="hidden"
						name={key}
						value={value || ""}
						readOnly={true}
					/>
				))}

				<IconButton
					disabled={!reply}
					type="submit"
					style={{ display: "flex", alignSelf: "center" }}
				>
					<Tooltip title="Submit Reply">
						<SendIcon />
					</Tooltip>
				</IconButton>
			</div>
		</form>
	)
}
