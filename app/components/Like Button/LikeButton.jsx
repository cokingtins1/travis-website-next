"use client"

import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { submitLike } from "@/app/actions/submitLike"
import { useOptimistic, useState } from "react"
import FollowModal from "./FollowModal"

export default function LikeButton({
	productId,
	session,
	likes,
	variant = "left",
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
			{variant === "left" && <p>{optimisticLikes}</p>}
			{openModal && (
				<FollowModal
					openModal={openModal}
					setModal={setOpenModal}
					productId={productId}
				/>
			)}

			<form
				action={async (formData) => {
					if (!session) {
						setOpenModal(true)
						return
					}
					addOptimisticLikes({
						id: Math.random(),
						content: formData.get("id"),
					})
					await submitLike(formData)
				}}
			>
				<IconButton type="submit">
					<input
						className="hidden"
						name="id"
						value={productId}
						readOnly={true}
					/>
					<input
						className="hidden"
						name="user_id"
						type="text"
						value={session?.user.id}
						readOnly={true}
					/>
					<input
						className="hidden"
						name="user_email"
						type="text"
						value={session?.user.email}
						readOnly={true}
					/>

					<FavoriteBorderIcon />
				</IconButton>
			</form>
			{variant === "bottom" && <p>{optimisticLikes}</p>}
		</div>
	)
}
