"use client"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import { useState } from "react"
import Comment from "./Comment"
import CommentInput from "./CommentInput"

export default function CommentSection({
	productId,
	session,
	comments,
	replies,
	activeUser_email,
	activeUser_id,
}) {
	const [expandComments, setExpandComments] = useState(false)

	const latestComments = comments.slice(0, 3)
	const restOfComments = comments.slice(3)

	const showMore = latestComments.length === 3 && restOfComments.length > 0


	return (
		<div className=" bg-bg-elevated rounded-xl p-4">
			<p className="text-xl">Comments</p>

			<CommentInput productId={productId} session={session} />

			<div className="flex flex-col gap-4 mt-8">
				{latestComments.map((comment) => {
					const commentReplies = replies.filter(
						(reply) => reply.comment_id === comment.comment_id
					)

					return (
						<Comment
							key={comment.comment_id}
							{...comment}
							replies={commentReplies}
							session={session}
							activeUser_id={activeUser_id}
							activeUser_email={activeUser_email}
						/>
					)
				})}

				{showMore && (
					<div>
						<Accordion sx={{ boxShadow: "none" }}>
							<AccordionSummary
								sx={{
									backgroundColor: "#121212",
									paddingLeft: 0,
									paddingRight: 0,
									justifyContent: "flex-end",
								}}
								expandIcon={<ExpandMoreIcon />}
								onClick={() => {
									setExpandComments(!expandComments)
								}}
							>
								<span className="text-text-secondary">
									{expandComments ? "Show Less" : "Show More"}{" "}
								</span>
							</AccordionSummary>
							<AccordionDetails
								sx={{
									backgroundColor: "#121212",
									padding: "0",
								}}
							>
								{restOfComments.map((comment) => {
									const commentReplies = replies.filter(
										(reply) =>
											reply.comment_id ===
											comment.comment_id
									)

									return (
										<Comment
											key={comment.comment_id}
											{...comment}
											replies={commentReplies}
											session={session}
											activeUser_id={activeUser_id}
											activeUser_email={activeUser_email}
										/>
									)
								})}
							</AccordionDetails>
						</Accordion>
					</div>
				)}
			</div>
		</div>
	)
}
