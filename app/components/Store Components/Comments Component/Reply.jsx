"use client"

import AccountCircle from "@mui/icons-material/AccountCircle"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import LikeButton from "../../Like Button/LikeButton"

import { returnCommentAge } from "@/libs/utils"
import { useState } from "react"
import ReplyInput from "./ReplyInput"
export default function Reply({
	created_at,
	reply,
	comment_id,
	product_id,
	reply_by_user_id,
	reply_by_user_email,
	reply_to_user_id,
	reply_to_user_email,
	reply_id,
	reply_likes,

	session,
	activeUser_id,
	activeUser_email,
}) {
	const [replying, setReplying] = useState(false)

	const replyAge = returnCommentAge(created_at)
	const userName = reply_by_user_email?.split("@")[0]

	const replyProps = {
		comment_id: comment_id,
		product_id: product_id,
		reply_by_user_id: activeUser_id,
		reply_by_user_email: activeUser_email,
		reply_to_user_id: reply_by_user_id,
		reply_to_user_email: reply_by_user_email,
	}

	return (
		<div className="flex justify-between">
			<div className="flex">
				<AccountCircle
					fontSize="large"
					style={{ marginRight: "8px" }}
				/>
				<div className="flex flex-col gap-1">
					<p className="text-sm">
						{userName}
						<span className="text-xs text-text-secondary ml-1">
							{replyAge}
						</span>
					</p>
					<div>
						<p>{reply}</p>
						<div className="flex gap-2">
							<LikeButton
								likes={reply_likes}
								productId={reply_id}
								session={session}
								variant="right"
								fontSize="0.75rem"
								icon={
									<ThumbUpIcon
										style={{ fontSize: ".875rem" }}
									/>
								}
							/>
							<button
								className="text-xs text-text-secondary"
								onClick={() => {
									if (!session) return
									setReplying(!replying)
								}}
							>
								Reply
							</button>
						</div>
					</div>
					{replying && (
						<div>
							<ReplyInput session={session} {...replyProps} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
