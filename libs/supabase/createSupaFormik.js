import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import * as Yup from "yup"

export default function createFormik(formType) {
	const router = useRouter()
	const form = useFormik({
		initialValues: {
			email: "",
			...(formType === "signup" || formType === "login"
				? { password: "" }
				: {}),
			...(formType === "signup" ? { passVerify: "" } : {}),
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid Email")
				.required("A valid email is required"),
			// Add other validation rules specific to the form type
			...(formType === "signup" ||
				("login" && {
					password: Yup.string().required("A password is required"),
				})),
			...(formType === "signup" && {
				passVerify: Yup.string()
					.oneOf([Yup.ref("password"), null], "Passwords must match")
					.required("Please validate your password"),
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
					form.setStatus(null)
					setSubmitting(true)
					resetForm()
					router.push("/")
				} else {
					form.setStatus({ message: "Invalid email or password" })
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
