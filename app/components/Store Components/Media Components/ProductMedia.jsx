export default function ProductMedia({ url }) {
	const embeddedUrl = url.split("v=")[1];

	//grid gap-0 grid-cols-1
	// grid-rows-1 place-items-center

	return (
		<div className="w-full">
			<div
				className="relative w-full overflow-hidden"
				style={{ paddingTop: "56.25%" }}
			>
				<p>
					<iframe
						className="absolute top-0 left-0 w-full h-full border-none"
						src={`https://www.youtube.com/embed/${embeddedUrl}`}
						width="560"
						height="315"
						allowfullscreen
					></iframe>
				</p>
			</div>
		</div>
	);
}
