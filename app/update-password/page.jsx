import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm"

export default function Page() {
	return (
		<main className="h-[32rem] flex justify-center items-center">
			<div className="flex flex-col items-center p-8">
				<h1>Reset Password</h1>
				<ResetPasswordForm />
			</div>
		</main>
	)
}
