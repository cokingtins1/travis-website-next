import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import * as Yup from "yup"

export default function createFormik(formType, onSubmitCallback) {
	const router = useRouter()
	const form = useFormik({
		initialValues: {
			email: "",
			...(formType === "signup" || ("login" && { password: "" })),
			...(formType === "signup" && { passVerify: "" }),
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
		onSubmit: async () => {
			
			console.log('submitting form')
			try {
				// Call the provided onSubmitCallback with form values
				if (formType === "signup" || formType === "login") {
					await onSubmitCallback(
						form.values.email,
						form.values.password
					)
					router.push("/dashboard")
				}

				if (formType === "resetPassword") {
					await onSubmitCallback(form.values.email)
					router.push('/store')
				}
			} catch (error) {
				console.error("Submission failed:", error)
			}
		},
	})

	return form
}
