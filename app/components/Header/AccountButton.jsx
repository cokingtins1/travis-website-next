import AccountCircle from "@mui/icons-material/AccountCircle"
import Link from "next/link"
import Button from "@mui/material/Button"

export default function AccountButton({ session }) {
	const primaryAccent = "#ffeec2"

	const buttonStyles = {
		width: "120px",
		height: "36px",
		// color: primaryAccent,
		// borderColor: primaryAccent,
		// "&:hover": {
		// 	borderColor: primaryAccent,
		// },
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
					>
						Login
					</Button>
				</Link>
			)}
		</>
	)
}
