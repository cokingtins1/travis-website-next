import { useFormik } from "formik"
import { useRouter } from 'next/navigation'
import * as Yup from "yup"

export default function createFormik(formType, onSubmitCallback) {
	const router = useRouter()

	const form = useFormik({
		initialValues: {
			email: "",
			password: "",
			...(formType === "signup" && { passVerify: "" }),
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid Email")
				.required("A valid email is required"),
			password: Yup.string().required("A password is required"),
			// Add other validation rules specific to the form type
			...(formType === "signup" && {
				passVerify: Yup.string()
					.oneOf([Yup.ref("password"), null], "Passwords must match")
					.required("Please validate your password"),
			}),
		}),
		onSubmit: async () => {
			try {
				// Call the provided onSubmitCallback with form values
				await onSubmitCallback(form.values.email, form.values.password)
				// Redirect to the dashboard or perform other actions
				router.push("/dashboard")
			} catch (error) {
				console.error("Submission failed:", error)
			}
		},
	})

	return form
}
