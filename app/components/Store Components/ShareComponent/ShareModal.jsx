import Modal from "@mui/material/Modal"
import { usePathname } from "next/navigation"
import Button from "@mui/material/Button"
import LinkIcon from "@mui/icons-material/Link"
import { useState } from "react"
import Image from "next/image"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"

export default function ShareModal({ openModal, setModal, imageSrc, product }) {
	const path = usePathname()
	const [copied, setCopied] = useState(false)

	const pathname = `beatsbytrav.com${path}`

	return (
		<Modal
			open={openModal}
			onClose={() => {
				setModal(false)
			}}
		>
			<div className="absolute w-auto top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-bg-elevated border border-gray-700 rounded-lg shadow-md p-4 ">
				<div className="flex justify-between items-start">
					<h1 className="text-2xl font-bold pb-8">Share Track</h1>
					<button onClick={() => setModal(false)}>
						<CloseIcon sx={{ color: "#a7a7a7" }} />
					</button>
				</div>
				<div className="flex items-center gap-4 mb-8">
					<div className="size-[75px] relative">
						<Image
							priority={true}
							src={imageSrc}
							alt="product image"
							fill={true}
							style={{ objectFit: "cover", borderRadius: "10px" }}
							sizes="(max-width: 430px), 75px"
						/>
					</div>
					<div className="flex flex-col">
						<p className="text-xl">{product.title}</p>
						<p className="text-xs text-text-secondary">by trav</p>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<div className="flex justify-between">
						<p className="text-text-secondary font-semibold text-sm ml-2">
							FULL URL
						</p>
						{copied && (
							<div className="flex gap-1 items-center">
								<LinkIcon
									className="text-green-500"
									sx={{
										fontSize: "0.875rem",
									}}
								/>
								<p className="text-xs text-green-500 mr-2">
									URL copied to clipboard
								</p>
							</div>
						)}
					</div>
					<div className="flex items-center justify-center gap-2 bg-black p-2 rounded-lg ">
						<LinkIcon
							sx={{
								marginTop: "2.5px",
								marginRight: "2px",
								color: "#a7a7a7",
							}}
						/>
						<p className="text-sm text-white">{pathname}</p>
						<Button
							size="small"
							sx={{
								whiteSpace: "nowrap",
								fontSize: "0.875rem",
								color: "#1976D2",
								marginBottom: "3px",
							}}
							onClick={() => {
								navigator.clipboard.writeText(pathname)
								setCopied(true)
							}}
						>
							<span className="pt-1">Copy</span>
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
