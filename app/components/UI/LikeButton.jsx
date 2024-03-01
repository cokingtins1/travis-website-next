"use client"

import IconButton from "@mui/material/IconButton"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { submitLike } from "@/app/actions/submitLike"
import { useOptimistic } from "react"

export default function LikeButton({ productId, likes, variant = "left" }) {
	const [optimisticLikes, addOptimisticLikes] = useOptimistic(
		likes,
		(state) => {
			return state + 1
		}
	)

	return (
		<div
			className={`flex items-center ${
				variant === "bottom" && "flex-col"
			}`}
		>
			{variant === "left" && <p>{optimisticLikes}</p>}
			<form
				action={async (formData) => {
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
						defaultValue={productId}
					/>
					<FavoriteBorderIcon />
				</IconButton>
			</form>
			{variant === "bottom" && <p>{optimisticLikes}</p>}
		</div>
	)
}
