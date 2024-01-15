import { useAuth } from "@/libs/contexts/UserContext"
import { redirect } from "next/navigation"

export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth()

	if (!currentUser) {
		redirect("/login")
	}

	return <Component {...rest} />
}
