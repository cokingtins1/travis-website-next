import LoginForm from "../components/LoginForm/LoginForm"
import SignUpForm from '../components/SignUpForm/SignUpForm'
import styles from "./styles.module.css"
import Divider from "@mui/material/Divider"

export default function Page() {
	return (
		<main className={styles.main}>
			<div className={styles.loginCont}>
				<h1>Sign Up</h1>
				<SignUpForm/>
			</div>
		</main>
	)
}
