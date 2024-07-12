import AddContentForm from "@/app/components/Dashboard Components/AddContentForm/AddContentForm";

import { getStorageItems } from "@/app/actions/getStorageItems";
import { getTempUploads } from "@/app/actions/getTempUploads";
import revalidate from "@/app/actions/revalidate";

export default async function AddContent() {
	const filesFromStorage = await getStorageItems();
	const tempUploads = await getTempUploads();
	revalidate(["storageItems", "temp_uploads"]);

	return (
		<>
			<div className="p-4 ">
				<AddContentForm
					filesFromStorage={filesFromStorage}
					tempUploads={tempUploads}
				/>
			</div>
		</>
	);
}
