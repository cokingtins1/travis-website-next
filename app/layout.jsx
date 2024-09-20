import { Inter } from "next/font/google"
import "./globals.css"
import SupabaseContext from "@/libs/supabase/supabase-context"
import ThemeProvider from "@/libs/contexts/ThemeContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ShoppingCartProvider } from "@/libs/contexts/CartContext"
import { AudioContextProvider } from "@/libs/contexts/AudioContext"
import HeaderWrapper from './components/Header/HeaderWrapper'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "beatsbytrav",
	description: "Generated by create next app",
	icons: {
		icon: "/TravLogoBlue.png",
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SupabaseContext>
				<ShoppingCartProvider>
						<AudioContextProvider>
							<HeaderWrapper/>
							<main className=" mx-auto max-w-[1440px] mt-[80px] mb-[100px]">
								<ThemeProvider>{children}</ThemeProvider>
							</main>
						</AudioContextProvider>
					</ShoppingCartProvider>
				</SupabaseContext>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
					theme="dark"
				/>
			</body>
		</html>
	)
}

