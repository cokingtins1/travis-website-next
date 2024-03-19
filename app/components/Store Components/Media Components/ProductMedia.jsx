export default function ProductMedia({ url }) {
	const embeddedUrl = url.split("v=")[1]

	return (
		<div className="flex justify-center bg-bg-elevated rounded-xl">
			<iframe
				className="flex flex-1 bg-bg-elevated "
				style={{ backgroundColor: "red" }}
				width="700"
				height="480"
				src={`https://www.youtube.com/embed/${embeddedUrl}`}
				allowFullScreen
				allowTransparency={true}
			/>
		</div>
	)
}
