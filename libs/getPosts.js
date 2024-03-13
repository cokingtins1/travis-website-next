export default async function getPosts() {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts")
	const postData = await res.json()
	if (!res.ok) throw new Error("Failed to fetch data")
	return postData
}
