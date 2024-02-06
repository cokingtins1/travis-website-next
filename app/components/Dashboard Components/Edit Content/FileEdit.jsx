"use client"

import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import { styled } from "@mui/material/styles"


export default function FileEdit({ productFiles }) {

    const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	})

	return (
		<>
			<div className="flex justify-center items-center flex-col">
				<Image
					alt=""
					src={
						productFiles.productImage
							? productFiles.productImage
							: beatKitImage
					}
					height={500}
					width={500}
				/>
				<Button
					type="button"
					size="lg"
					sx={{
						color: "#a7a7a7",
						"&:hover": { backgroundColor: "#2a2a2a" },
					}}
					startIcon={<EditIcon />}
				>
					<label className="cursor-pointer">
						{" "}
						Edit Picture
						<VisuallyHiddenInput
							name="file"
							onChange={(e) => {
								handleChange(e)
							}}
							type="file"
						/>
					</label>
				</Button>
			</div>
			<div className="flex flex-col">
				<p>{productFiles.MP3_file.name}</p>
				<p>File</p>
				<p>File</p>
			</div>
		</>
	)
}
