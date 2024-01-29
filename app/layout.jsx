import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header/Header"
import SupabaseContext from "@/libs/supabase/supabase-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SupabaseContext>
					<Header />
					<main className=" bg-slate-700 mx-[12rem]">{children}</main>
				</SupabaseContext>
			</body>
		</html>
	)
}
