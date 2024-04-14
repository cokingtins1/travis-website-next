"use client"

// MUI Components
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"

// Icons
import ListItemIcon from "@mui/material/ListItemIcon"
import HomeIcon from "@mui/icons-material/Home"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import AlbumIcon from "@mui/icons-material/Album"
import YouTubeIcon from "@mui/icons-material/YouTube"
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from "@mui/icons-material/Add"

// React/Next
import { useState } from "react"
import Link from "next/link"

export default function SideBar() {
	const iconPrimary = "#b3b3b3"

	const [open, setOpen] = useState()

	const myContent = [
		{ id: 1, text: "Add Content", icon: <AddIcon />, href: "add-content" },
		{ id: 2, text: "Usage Notes", icon: <NotesIcon />, href: "usage-notes" },
		// { id: 3, text: "Albums", icon: <AlbumIcon />, href: "" },
		// { id: 4, text: "Videos", icon: <YouTubeIcon />, href: "" },
	]

	return (
		<>
			<List>
				<Link href={"/dashboard"}>
					<ListItemButton>
						<ListItemIcon>
							<HomeIcon sx={{ color: iconPrimary }} />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</Link>
				<ListItemButton
					onClick={() => {
						setOpen(!open)
					}}
				>
					<ListItemIcon>
						<InboxIcon sx={{ color: iconPrimary }} />
					</ListItemIcon>
					<ListItemText primary="My Content" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{myContent.map((item) => (
							<Link
								key={item.id}
								href={`/dashboard/${item.href}`}
							>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemIcon sx={{ color: iconPrimary }}>
										{item.icon}
									</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</Link>
						))}
					</List>
				</Collapse>
			</List>
		</>
	)
}
