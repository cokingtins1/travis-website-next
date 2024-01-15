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
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddIcon from "@mui/icons-material/Add"

// React Hooks
import { useState } from "react"


export default function SideBar() {
	const [open, setOpen] = useState()

	const filterItems = {
		Navlinks: ["Dashboard", "My Content", "Tracks", "Stats", "Sales"],
	}

	const myContent = [
		{ id: 1, text: "Add Content", icon: <AddIcon /> },
		{ id: 2, text: "Tracks", icon: <LibraryMusicIcon /> },
		{ id: 3, text: "Albums", icon: <AlbumIcon /> },
		{ id: 4, text: "Videos", icon: <YouTubeIcon /> },
	]

	return (
		<>
			<List>
				<ListItemButton>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItemButton>
				<ListItemButton
					onClick={() => {
						setOpen(!open)
					}}
				>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="My Content" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>

				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{myContent.map((item) => (
							<ListItemButton key={item.id} sx={{ pl: 4 }}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
			</List>
		</>
	)
}
