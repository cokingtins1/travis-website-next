import TextField from "@mui/material/TextField"

import beatKitImage from "@/public/beatKitImage.jpg"
import Image from "next/image"

export default function BasicInfo({
	title,
	type,
	releaseDate,
	description,
	updateFields,
}) {
	return (
		<>
			<form>
				<div className="flex gap-4">
					<div>
						<Image
							width={250}
							src={beatKitImage}
							alt="product image"
						></Image>
					</div>
					<div>
						<TextField
							fullWidth
							size="small"
							id="title"
							label="Title"
							type="text"
							InputLabelProps={{
								shrink: true,
							}}
							value={title}
							onChange={(e) => {
								updateFields({ type: e.target.value })
							}}
						/>

						<TextField
							fullWidth
							size="small"
							id="title"
							label="Title"
							type="text"
							InputLabelProps={{
								shrink: true,
							}}
							value={title}
							onChange={(e) => {
								updateFields({ type: e.target.value })
							}}
						/>
					</div>
				</div>
			</form>
		</>
	)
}
