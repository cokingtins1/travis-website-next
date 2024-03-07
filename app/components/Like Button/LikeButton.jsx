"use client"

import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { useOptimistic, useState } from "react"
import FollowModal from "./FollowModal"

export default function LikeButton({
	likes,
	likeId,
	product_id,
	likedByUser,
	session,
	submitCallback,
	variant,
	fontSize = "1rem",
	icon = <FavoriteBorderIcon />,
}) {
	const [optimisticLikes, addOptimisticLikes] = useOptimistic(
		likes,
		(state) => {
			return state + 1
		}
	)

	const [openModal, setOpenModal] = useState(false)

	return (
		<div
			className={`flex items-center ${
				variant === "bottom" && "flex-col"
			}`}
		>
			{variant && variant === "left" && <p>{optimisticLikes}</p>}
			{openModal && (
				<FollowModal openModal={openModal} setModal={setOpenModal} />
			)}

			<form
				action={async (formData) => {
					if (!session) {
						setOpenModal(true)
						return
					}
					if (likedByUser) return
					addOptimisticLikes({
						id: Math.random(),
						content: formData.get("id"),
					})
					await submitCallback(formData)
				}}
			>
				<IconButton type="submit">
					<input
						className="hidden"
						name="product_id"
						value={product_id || ""}
						readOnly={true}
					/>
					<input
						className="hidden"
						name="likedId"
						value={likeId || ""}
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

					{icon}
				</IconButton>
			</form>
			{((variant && variant === "bottom") || variant === "right") && (
				<p style={{ fontSize: fontSize }}>{optimisticLikes}</p>
			)}
		</div>
	)
}
