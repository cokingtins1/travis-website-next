"use server"

export default async function submitForm(formData) {
	console.log(formData.get("title"))
}
