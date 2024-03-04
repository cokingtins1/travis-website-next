import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function FreeDownloadModal({ openModal, setModal }) {
	return (
		<Modal
			open={openModal}
			onClose={() => {
				setModal(false)
			}}
		>
			<div className="absolute w-[400px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-bg-elevated border border-gray-700 rounded-lg shadow-md p-4 ">
				<form action="" className="flex flex-col">
					<h1 className="text-xl font-bold pb-8">Free Download</h1>
					<p className="text-sm text-text-secondary pb-4">
						Enter your email address to unlock your free download.
						We will send your free track to the email address.{" "}
					</p>
					<div className="flex flex-col gap-4">
						<TextField
							label="Name"
							name="name"
							fullWidth
							size="small"
						/>
						<TextField
							label="Email"
							name="email"
							fullWidth
							size="small"
						/>
						<Button type="submit" variant="outlined">
							Send
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	)
}
