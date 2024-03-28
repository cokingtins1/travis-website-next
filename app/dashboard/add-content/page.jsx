import AddContentForm from "@/app/components/Dashboard Components/AddContentForm/AddContentForm";
import Link from "next/link";

import { Button } from "@/app/components/UI/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getStorageItems } from "@/app/actions/getStorageItems";
import { getTempUploads } from "@/app/actions/getTempUploads";
import revalidate from "@/app/actions/revalidate";

export default async function AddContent() {
	const filesFromStorage = await getStorageItems();
	const tempUploads = await getTempUploads();
	revalidate(["storageItems", "temp_uploads"]);

	return (
		<>
			<div className="flex flex-col gap-4 p-4 ">
				<div className="flex flex-shrink">
					<Link href={"/dashboard"}>
						<Button
							size="circle"
							variant="circle"
							icon={<ArrowBackIcon />}
						/>
					</Link>
				</div>
				<AddContentForm
					filesFromStorage={filesFromStorage}
					tempUploads={tempUploads}
				/>
			</div>
		</>
	);
}
