import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { getFreeDownload } from "@/app/actions/getFreeDownload"
import FormHelperText from "@mui/material/FormHelperText"

import { useState } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"

export default function FreeDownloadModal({
	openModal,
	setModal,
	productId,
	imageSrc,
}) {
	const [submit, setSubmit] = useState(false)

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required(
				"Please at least provide your first name"
			),

			email: Yup.string()
				.email("Invalid email")
				.required("A valid email is required"),
		}),
	})

	return (
		<Modal
			open={openModal}
			onClose={() => {
				setModal(false)
			}}
		>
			<div className="absolute w-[400px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-bg-elevated border border-gray-700 rounded-lg shadow-md p-4 ">
				<form action={getFreeDownload} className="flex flex-col">
					<h1 className="text-2xl font-bold pb-8">Free Download</h1>
					<p className="text-sm text-text-secondary pb-4">
						Enter your email address to unlock your free download.
						We will send your free track to the email address.{" "}
					</p>
					<div className="flex flex-col gap-2">
						<div className="mt-2">
							<TextField
								label="Name"
								type="text"
								name="name"
								fullWidth
								size="small"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={Boolean(
									formik.touched.name && formik.errors.name
								)}
							/>
							{formik.touched.name && formik.errors.name ? (
								<FormHelperText error>
									{formik.errors.name}
								</FormHelperText>
							) : (
								<FormHelperText>&nbsp;</FormHelperText>
							)}
						</div>
						<div className="mb-2">
							<TextField
								label="Email"
								type="email"
								name="email"
								fullWidth
								size="small"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={Boolean(
									formik.touched.email && formik.errors.email
								)}
							/>
							{formik.touched.email && formik.errors.email ? (
								<FormHelperText error>
									{formik.errors.email}
								</FormHelperText>
							) : (
								<FormHelperText>&nbsp;</FormHelperText>
							)}
						</div>
						<input
							className="hidden"
							type="text"
							name="productId"
							readOnly={true}
							value={productId}
						/>
						<input
							className="hidden"
							type="text"
							name="imageSrc"
							readOnly={true}
							value={imageSrc}
						/>
						{submit ? (
							<p className="text-xs text-center text-green-500">
								{`A download link has been to: ${formik.values.email}`}
							</p>
						) : (
							<p className="text-xs">&nbsp;</p>
						)}

						<Button
							disabled={!formik.dirty || !formik.isValid}
							onClick={() => {
								setSubmit(true)
							}}
							type="submit"
							variant="outlined"
						>
							Send
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	)
}
