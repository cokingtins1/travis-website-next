// NewFiles.jsx
// import FileUpload from "./FileUpload"
import NewFileUpload from "./NewUploadFile"

export default function NewFiles({ data, updateFields }) {
	// console.log("this is the data", data['.bpm'])
	return (
		<>
			<div className="flex flex-col gap-4">
				{/* <NewFileUpload fileType="MP3" data={data} updateFields={updateFields} />
				<NewFileUpload fileType="WAV" data={data} updateFields={updateFields} />
				<NewFileUpload fileType="STEM" data={data} updateFields={updateFields} /> */}
			</div>
		</>
	)
}
