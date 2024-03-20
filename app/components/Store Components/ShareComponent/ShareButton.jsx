"use client"

import IconButton from "@mui/material/IconButton"
import { useState } from "react"
import IosShareIcon from "@mui/icons-material/IosShare"
import ShareModal from "./ShareModal"

export default function ShareButton({ imageSrc, product }) {
	const [openModal, setOpenModal] = useState(false)

	return (
		<>
			{openModal && (
				<ShareModal
					openModal={openModal}
					setModal={setOpenModal}
					imageSrc={imageSrc}
					product={product}
				/>
			)}
			<IconButton onClick={() => setOpenModal(true)}>
				<IosShareIcon />
			</IconButton>
		</>
	)
}
