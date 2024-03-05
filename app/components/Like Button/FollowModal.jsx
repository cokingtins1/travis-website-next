import Modal from "@mui/material/Modal"
import { useEffect, useState } from "react"
import SignUpForm from "../SignUpForm/SignUpForm"

export default function FollowModal({ openModal, setModal, productId }) {
	const [submit, setSubmit] = useState(false)

	useEffect(()=> {

	}, [submit])

	return (
		<Modal
			open={openModal}
			onClose={() => {
				setModal(false)
			}}
		>
			<div className="absolute w-[400px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-bg-elevated border border-gray-700 rounded-lg shadow-md p-4 ">
				<h1 className="text-2xl font-bold pb-8">Create Account</h1>
				<p className="text-sm text-text-secondary pb-4">
					Create an account to follow my music and gain access to my
					free samples.{" "}
				</p>
				<SignUpForm submit={submit} setSubmit={setSubmit} />
				{/* {submit ? (
					<p className="text-xs text-center text-green-500">
						thank you for signing up
					</p>
				) : (
					<p className="text-xs">&nbsp;</p>
				)} */}
			</div>
		</Modal>
	)
}
