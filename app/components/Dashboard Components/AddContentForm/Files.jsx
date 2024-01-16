import UploadFile from "./Upload Components/UploadFile"
import UploadFolder from "./Upload Components/UploadFolder"

export default function Files() {
	return (
		<>
			<div className='flex flex-col gap-4'>
				<UploadFile />
				<UploadFolder />
			</div>
		</>
	)
}
