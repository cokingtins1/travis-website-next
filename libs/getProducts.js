export default async function getProducts() {
	try {
		const res = await fetch("http://localhost:3000/api/store", {
			cache: "no-store",
		})

		if (!res.ok) {
			throw new Error("failed to fetch products")
		}

		return res.json()
	} catch (error) {
		console.log("Error loading products", error)
	}
}