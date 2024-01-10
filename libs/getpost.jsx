export default async function getpost(userId) {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${userId}`
	)

	if (!res.ok) throw new Error("Failed to fetch user")

	return res.json()
}
