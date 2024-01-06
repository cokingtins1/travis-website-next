import LoginForm from "../components/LoginForm/LoginForm"
import styles from "./styles.module.css"
import Divider from "@mui/material/Divider"

export default function Page() {
	return (
		<main className={styles.main}>
			<div className={styles.loginCont}>
				<h1>Log in</h1>
				<LoginForm />
			</div>
		</main>
	)
}
