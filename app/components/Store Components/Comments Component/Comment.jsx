"use client"

import AccountCircle from "@mui/icons-material/AccountCircle"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import LikeButton from "../../Like Button/LikeButton"
import Button from "@mui/material/Button"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"

import { returnCommentAge, secondsSince } from "@/libs/utils"
import { useEffect, useState } from "react"
import ReplyInput from "./ReplyInput"
import Reply from "./Reply"
import { submitLikeComment } from "@/app/actions/submitLike"

export default function Comment({
	created_at,
	comment_id,
	comment,
	user_id,
	product_id,
	user_email,
	comment_likes,

	replies,
	session,
	activeUser_id,
	activeUser_email,
}) {
	const [replying, setReplying] = useState(false)
	const [replyingToReply, setReplyingToReply] = useState(false)
	const [firstReplyBtnClicked, setFirstReplyBtnClicked] = useState(null)


	const [expandReplies, setExpandReplies] = useState(false)
	const [pulse, setPulse] = useState(false)

	const commentAge = returnCommentAge(created_at)
	const userName = user_email?.split("@")[0]

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

	function handleChange() {
		if (replyingToReply) {
			setExpandReplies(true)
			setReplying(false)
			setReplyingToReply(false)
			return
		}

		if (!replying) {
			setExpandReplies(!expandReplies)
		} else {
			setExpandReplies(replying && true)
			setReplying(false)
		}
	}

	const replyProps = {
		comment_id: comment_id,
		product_id: product_id,
		reply_by_user_id: activeUser_id,
		reply_by_user_email: activeUser_email,
		reply_to_user_id: user_id,
		reply_to_user_email: user_email,
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
							{commentAge}
						</span>
					</p>
					<div>
						<p>{comment}</p>
						<div className="flex gap-2">
							<LikeButton
								likes={comment_likes}
								likeId={comment_id}
								product_id={product_id}
								likedByUser={false}
								session={session}
								submitCallback={submitLikeComment}
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
							<ReplyInput
								session={session}
								handleChange={handleChange}
								setReplyBtnClicked={setFirstReplyBtnClicked}
								replyToReply={false}
								{...replyProps}
							/>
						</div>
					)}
					{replies && replies.length > 0 && (
						<div>
							<Accordion
								expanded={expandReplies}
								onChange={handleChange}
								sx={{ boxShadow: "none" }}
							>
								<AccordionSummary
									sx={{
										backgroundColor: "#121212",
										paddingLeft: 0,
										paddingRight: 0,
										justifyContent: "flex-end",
										"& > .MuiAccordionSummary-content": {
											margin: "0px",
										},
										"&.Mui-expanded": {
											minHeight: "36px",
										},
										minHeight: "36px",
									}}
								>
									<Button
										startIcon={
											expandReplies ? (
												<ExpandLess />
											) : (
												<ExpandMoreIcon />
											)
										}
										sx={{ textTransform: "none" }}
									>
										<span className="text-xs font-semibold text-blue-accent">
											<span className="">
												{replies.length}
												{replies.length > 1
													? " replies"
													: " reply"}
											</span>
										</span>
									</Button>
								</AccordionSummary>
								<AccordionDetails
									sx={{
										backgroundColor: "#121212",
										padding: "0",
									}}
								>
									{replies.map((reply) => (
										<Reply
											key={reply.reply_id}
											{...reply}
											handleChange={handleChange}
											replyingToReply={replyingToReply}
											setReplyingToReply={
												setReplyingToReply
											}
											session={session}
											activeUser_id={activeUser_id}
											activeUser_email={activeUser_email}
										/>
									))}
								</AccordionDetails>
							</Accordion>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
