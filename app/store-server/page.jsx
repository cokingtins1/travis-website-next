"use client"

import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { Button as MyButton } from "@/app/components/UI/Button"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useSupabase } from "@/libs/supabase/supabase-context"
import { useEffect, useState } from "react"

export default function Page() {
	const [userId, setUserId] = useState("")
	const [user, setUser] = useState(null)
	const [media, setMedia] = useState([])
	const [uploading, setUploading] = useState(false)

	const { supabase } = useSupabase()

	async function getUser() {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			if (user !== null) {
				setUser(user)
				setUserId(user.id)
			} else {
				setUserId("")
			}
		} catch (e) {}
	}

	async function uploadImage(e) {
		try {
			setUploading(true)
			const file = e.target.files[0]
			const fileExt = file.name.split(".").pop()
			const fileName = `${crypto.randomUUID()}.${fileExt}`
			console.log("File:", file)
			console.log("File Extension:", fileExt)
			console.log("File Name:", fileName)

			if (!user) {
				throw new Error("user not authenticated for file upload")
			}

			const filePath = `user_uploads/${userId}/${fileName}`

			const { error } = await supabase.storage
				.from("files")
				.upload(filePath, file)

			if (error) {
				throw error
			}
		} catch (err) {
			console.error(err)
		} finally {
			setUploading(false)
		}
	}

	async function testSupabase() {
		const { data: buckets } = await supabase.storage.listBuckets()
		console.log(buckets)
	}

	async function getMedia() {
		const { data, error } = await supabase.storage
			.from("uploads")
			.list(userId + "/", {
				limit: 10,
				offset: 0,
				sortBy: {
					column: "name",
					order: "asc",
				},
			})

		if (data) {
			setMedia(data)
		} else {
			console.log(71, error)
		}
	}

	useEffect(() => {
		getUser()
		// getMedia()
	}, [])

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
			<Button
				component="label"
				variant="contained"
				startIcon={<CloudUploadIcon />}
				sx={{ width: "115px", height: "40px" }}
			>
				Upload
				<VisuallyHiddenInput
					onChange={uploadImage}
					disabled={uploading}
					type="file"
				/>
			</Button>

			{media && media}
		</>
	)
}
