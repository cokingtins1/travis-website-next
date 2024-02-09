"use server"

export async function addToCart(formData) {
	const { id, type, price } = JSON.parse(formData.get("cart"))
}
