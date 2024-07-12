import Link from "next/link"
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm"
import styles from "./styles.module.css"

export default function Page() {
	return (
		<main className={styles.main}>
			<div className={styles.loginCont}>
				<h1>Password Reset</h1>
				<ForgotPasswordForm />
			</div>
		</main>
	)
}
