const LocalStrategy = require("passport-local").Strategy
import bcrypt from "bcrypt"

export default function initializePassport(passport) {
	authenticateUser = async (email, password, done) => {
		const user = getUserByEmail(email)
		if (user == null) {
			return done(null, false, { message: "No user with that email" })
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user)
			} else {
				return done(null, false, { message: "Password incorrect" })
			}
		} catch (error) {
			return done(error)
		}
	}
	passport.use(
		new LocalStrategy({ usernameField: "email" }),
		authenticateUser
	)
	passport.serializeUser((user, done) => {})
	passport.deserializeUser((id, done) => {})
}
