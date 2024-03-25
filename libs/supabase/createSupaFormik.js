import { useFormik } from "formik"
import { useRouter } from "next/navigation"

import * as Yup from "yup"

export default function createFormik(formType) {
	const router = useRouter()
	const form = useFormik({
		initialValues: {
			email: "",
			...(formType === "signup" ||
			formType === "login" ||
			formType === "forgotPassword"
				? { password: "" }
				: {}),
			...(formType === "signup" || formType === "forgotPassword"
				? { passVerify: "" }
				: {}),
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid Email")
				.required("A valid email is required"),
			// Add other validation rules specific to the form type
			...(formType === "signup" ||
			formType === "login" ||
			formType === "forgotPassword"
				? {
						password: Yup.string()
							.required("A password is required")
							.min(6, "Password must be at least 6 characters"),
				  }
				: {}),
			...(formType === "signup" && {
				passVerify: Yup.string()
					.oneOf([Yup.ref("password"), null], "Passwords must match")
					.required("Please validate your password")
					.min(6, "Password must be at least 6 characters"),
			}),
		}),

		onSubmit: async (values, { resetForm, setSubmitting }) => {
			try {
				const res = await fetch(`/auth/${formType}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				})

				if (res.ok) {
					form.setStatus({
						code: 202,
						message: "Successful signup",
					})
					setSubmitting(true)
					// resetForm()
					router.refresh()
				} else {
					if (res.status === 409) {
						form.setStatus({
							code: 409,
							message:
								"This email is already in use. Please login here:",
						})
					} else {
						form.setStatus({
							code: 402,
							message: "Invalid email or password",
						})
					}
				}
			} catch (error) {
				console.error("Error:", error)
			} finally {
				setSubmitting(false)
			}
		},
	})

	return form
}
