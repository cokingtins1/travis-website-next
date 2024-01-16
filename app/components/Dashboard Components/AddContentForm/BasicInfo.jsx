import TextField from "@mui/material/TextField"

export default function BasicInfo({
	title,
	type,
	releaseDate,
	description,
	updateFields,
}) {
	return (
		<>
			<TextField
				label="Title"
				type="text"
				value={title}
				onChange={(e) => {
					updateFields({ title: e.target.value })
				}}
			/>

			<label>Type: </label>
			<input
				type="text"
				value={type}
				onChange={(e) => {
					updateFields({ type: e.target.value })
				}}
			/>
			<label>Release Date: </label>
			<input
				type="text"
				value={releaseDate}
				onChange={(e) => {
					updateFields({ releaseDate: e.target.value })
				}}
			/>
			<label>Description: </label>
			<input
				type="text"
				value={description}
				onChange={(e) => {
					updateFields({ description: e.target.value })
				}}
			/>
		</>
	)
}
