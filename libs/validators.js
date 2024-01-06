export default function validateLogin({
	email: email,
	password: password,
	passVerify: passVerify,
}) {
	let errors = []

	errors = errors.concat(checkEmail(email))
	errors = errors.concat(checkPassword(password))
	errors = errors.concat(checkPassVerify(password, passVerify))

	return errors

	function checkEmail(email) {
		const errors = []
		if (email.length === 0) {
			errors.push("Please enter an email address")
		}
		if (!email.includes("@")) {
			errors.push("Please enter a valid email containing '@' ")
		}
		return errors
	}

	function checkPassword(password) {
		const errors = []

		if (password.length === 0) {
			errors.push("Please enter a password")
		}
		return errors
	}

	function checkPassVerify(password, passVerify) {
		const errors = []
		if (password !== passVerify) {
			errors.push("Passwords do no match")
		}
		return errors
	}
}
