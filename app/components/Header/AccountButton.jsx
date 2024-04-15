import AccountCircle from "@mui/icons-material/AccountCircle"
import Link from "next/link"
import Button from "@mui/material/Button"

export default function AccountButton({ session, toggleDrawer }) {
	const buttonStyles = {
		width: "120px",
		height: "36px",
	}

	return (
		<>
			{session ? (
				<form action="/auth/logout" method="post">
					<Button
						sx={buttonStyles}
						variant="outlined"
						startIcon={<AccountCircle />}
						type="submit"
						onClick={() => toggleDrawer()}
					>
						Logout
					</Button>
				</form>
			) : (
				<Link href={"/login"}>
					<Button
						sx={buttonStyles}
						variant="outlined"
						startIcon={<AccountCircle />}
						onClick={() => toggleDrawer()}

					>
						Login
					</Button>
				</Link>
			)}
		</>
	)
}
