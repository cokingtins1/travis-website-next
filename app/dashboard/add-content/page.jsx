"use client"
import AddContentForm from "@/app/components/Dashboard Components/AddContentForm/AddContentForm"
import Link from "next/link"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { Button } from "@/app/components/UI/Button"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export default function AddContent() {
	return (
		<>
			<div className="flex flex-col gap-4 p-4 ">
				<Link href={"/dashboard"}>
					<Button
						size="circle"
						variant="circle"
						icon={<ArrowBackIcon />}
					/>
				</Link>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<AddContentForm />
				</LocalizationProvider>
			</div>
		</>
	)
}
