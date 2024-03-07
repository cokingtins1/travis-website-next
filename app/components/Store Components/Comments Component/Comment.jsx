import AccountCircle from "@mui/icons-material/AccountCircle"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import LikeButton from "../../Like Button/LikeButton"

export default function Comment({ productId, session, likedByUser }) {
	const commentId = "69"

	return (
		<div className="flex">
			<AccountCircle fontSize="large" style={{ marginRight: "8px" }} />
			<div className="flex flex-col gap-1">
				<p className="text-sm">
					Username{" "}
					<span className="text-xs text-text-secondary ml-1">
						2 hours ago
					</span>
				</p>
				<div>
					<p>This is the sickets beat I've ever heard in my life</p>
					<LikeButton
						likes={1}
						productId={commentId}
						variant="right"
						fontSize="0.75rem"
						icon={<ThumbUpIcon style={{ fontSize: ".875rem" }} />}
					/>
				</div>
			</div>
		</div>
	)
}
