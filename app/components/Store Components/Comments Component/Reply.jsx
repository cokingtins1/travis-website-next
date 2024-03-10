"use client"

import AccountCircle from "@mui/icons-material/AccountCircle"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import LikeButton from "../../Like Button/LikeButton"

import { returnCommentAge, secondsSince } from "@/libs/utils"
import { useEffect, useState } from "react"
import ReplyInput from "./ReplyInput"
import { submitLikeReply } from "@/app/actions/submitLike"
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
	reply_to_reply,

	handleChange,
	replyingToReply,
	setReplyingToReply,
	session,
	activeUser_id,
	activeUser_email,
}) {
	const [pulse, setPulse] = useState(false)
	const [replyBtnClicked, setReplyBtnClicked] = useState(null)
	const replyAge = returnCommentAge(created_at)
	const userName = reply_by_user_email?.split("@")[0]
	const replyToUserName = reply_to_user_email?.split("@")[0]

	useEffect(() => {
		const secondsValue = secondsSince(created_at)

		if (secondsValue <= 1) {
			setPulse(true)
			const timer = setTimeout(() => {
				setPulse(false)
			}, 1000)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [])

	const replyProps = {
		comment_id: comment_id,
		product_id: product_id,
		reply_by_user_id: activeUser_id,
		reply_by_user_email: activeUser_email,
		reply_to_user_id: reply_by_user_id,
		reply_to_user_email: reply_by_user_email,
	}

	return (
		<div
			className={`flex justify-between rounded-lg ${
				pulse
					? "transition-colors ease-in-out duration-1000 bg-bg-hover"
					: "transition-colors ease-in-out duration-1000 bg-bg-elevated "
			}`}
		>
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
						<p>
							{" "}
							<span className="text-blue-accent">
								{reply_to_reply && `@${replyToUserName} `}
							</span>
							{reply}
						</p>
						<div className="flex gap-2">
							<LikeButton
								likes={reply_likes}
								likeId={reply_id}
								productId={product_id}
								likedByUser={false}
								session={session}
								submitCallback={submitLikeReply}
								variant="right"
								fontSize="0.75rem"
								icon={
									<ThumbUpIcon
										style={{ fontSize: ".875rem" }}
									/>
								}
							/>
							<button
								id={reply_id}
								className="text-xs text-text-secondary"
								onClick={() => {
									if (!session) return

									if (!replyBtnClicked) {
										setReplyBtnClicked(reply_id)
									} else {
										setReplyBtnClicked(null)
									}
									if(replyingToReply && replyBtnClicked){
										setReplyingToReply(false)
									}
									setReplyingToReply(true)
								}}
							>
								Reply
							</button>
						</div>
					</div>
					{replyBtnClicked === reply_id && (
						<div>
							<ReplyInput
								session={session}
								handleChange={handleChange}
								setReplyBtnClicked = {setReplyBtnClicked}
								replyToReply={true}
								{...replyProps}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
