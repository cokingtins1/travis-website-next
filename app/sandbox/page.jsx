"use client"

import createFormik from "@/libs/FormSubmit"
import { useAuth } from "@/libs/contexts/UserContext"

export default function Page() {
	const { signup } = useAuth()

	const formik = createFormik("signup", signup)
	console.log("signup form:", formik)
	return <div>sandbox</div>
}
