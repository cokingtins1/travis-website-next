

import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header/Header"
import AuthProvider from "@/libs/contexts/UserContext"

import ThemeButton from "./components/UI/ThemeButton"

// import PrivateRoute from "@/libs/PrivateRoute"
// import { Profile } from "./components/Dashboard/dashboard"
// import Store from "./store/page"
// import NewPage from './newpage/page'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({ children }) {
	// const [themeMode, setThemeMode] = useState("light")

	// function darkTheme() {
	// 	setThemeMode("dark")
	// }

	// function lightTheme() {
	// 	setThemeMode("light")
	// }

	// useEffect(() => {
	// 	document.querySelector("html").classList.remove("dark", "light")
	// 	document.querySelector("html").classList.add(themeMode)
	// }, [themeMode])

	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<Header />
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
