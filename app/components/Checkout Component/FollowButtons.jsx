import XIcon from "@mui/icons-material/X"
import IconButton from "@mui/material/IconButton"
import YouTubeIcon from "@mui/icons-material/YouTube"
import Link from "next/link"
import Tooltip from "@mui/material/Tooltip"
import TwitchIcon from "../UI/TwitchIcon"
import InstagramIcon from "@mui/icons-material/Instagram"

export default function FollowButtons() {
	const followButtons = [
		{
			name: "Twitter",
			icon: <XIcon />,
			href: "https://twitter.com/beatsbytrav_",
			color: "#000000",
		},
		{
			name: "Instagram",
			icon: <InstagramIcon />,
			href: "https://www.instagram.com/1trav/?hl=en",
			color: "#000000",
		},
		{
			name: "Twitch",
			icon: <TwitchIcon />,
			href: "https://www.twitch.tv/beatsbytrav_",
			color: "#9046ff",
		},
		{
			name: "Youtube",
			icon: <YouTubeIcon />,
			href: "https://www.youtube.com/@beatsbytrav",
			color: "#ff0000",
		},
	]

	return (
		<div className="flex flex-col items-center mt-8">
			<p className="text-text-secondary">Follow me:</p>
			<ul className="flex gap-4">
				{followButtons.map((button, index) => (
					<li key={index}>
						<Tooltip title={button.name}>
							<Link
								href={button.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconButton
									aria-label={button.name}
									sx={{ color: "#a7a7a7" }}
								>
									{button.icon}
								</IconButton>
							</Link>
						</Tooltip>
					</li>
				))}
			</ul>
		</div>
	)
}
