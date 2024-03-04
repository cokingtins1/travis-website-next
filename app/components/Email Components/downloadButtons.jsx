import beatKitImage from "@/public/beatKitImage.jpg"

export default function DownloadButtons() {
	const imageSrc1 =
		"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/e35cd64a-cd05-4c16-8fed-1e03a2b604f6/productImage/canva-raven-gothic-music-album-cover-art-aXKmEoNJThg.jpg"

	return (
		<>
			<div
				style={{
					marginInline: "auto",
					width: "500px",
					height: "800px",
					backgroundColor: "white",
				}}
			>
				<ul style={{ listStyle: "none", marginLeft: "40px" }}>
					#each order
					<li style={{ listStyle: "none", marginBottom: "16px" }}>
						<div
							style={{
								display: "inline-block",
								verticalAlign: "middle",
							}}
						>
							<img
								src={imageSrc1}
								style={{ width: "100px", height: "100px" }}
							/>
						</div>
						<div
							style={{
								display: "inline-block",
								verticalAlign: "middle",
								marginLeft: "8px",
							}}
						>
							<p style={{ color: "black", fontSize: "1rem" }}>
								this.productName
							</p>
							<p style={{ color: "#a7a7a7", fontSize: "0.75" }}>
								by trav
							</p>
						</div>

						<div
							style={{
								display: "inline-block",
								verticalAlign: "middle",
								marginLeft: "24px",
							}}
						>
							<a
								href="{{downloadUrl}}"
								style={{
									marginLeft: "24px",
									color: "black",
									backgroundColor: "#1976d2",
									border: "1px solid #1976d2,",
									borderColor: "#1976d2",
									borderRadius: "6px",
									borderWidth: "1px",
									color: "#ffffff",
									display: "inline-block",
									fontSize: "14px",
									fontWeight: "normal",
									letterSpacing: "0px",
									lineHeight: "normal",
									padding: "12px 18px 12px 20px",
									textDecoration: "none",
									borderStyle: "solid",
								}}
							>
								Download File
							</a>
						</div>
					</li>
					order
				</ul>
			</div>
		</>
	)
}
