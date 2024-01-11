"use client"

import getPosts from "@/libs/getPosts"
import { useEffect, useMemo, useState } from "react"
import SearchBar from "./SearchBar"

export default function SearchResultBox() {
	const [posts, setPosts] = useState([])
	const [query, setQuery] = useState("")

	const filteredItems = useMemo(() => {
		return posts.filter((post) => {
			return post.title.includes(query) || post.body.includes(query)
		})
	}, [posts, query])

	useEffect(() => {
		const fetchPost = async () => {
			const json = await getPosts()
			setPosts(json)
		}
		fetchPost()
		// getPosts().then((json) => {
		// 	setPosts(json)
		// 	setSearchResults(json)
		// })
	}, [])

	return (
		<>
			<div>
				<h1>Search Results</h1>
				<SearchBar posts={posts} query={query} setQuery={setQuery} />
				{query.length === 0 ? (
					<span>no items</span>
				) : (
					filteredItems.map((post) => {
						return (
							<div key={post.id}>
								<p>{post.title}</p>
							</div>
						)
					})
				)}
			</div>
		</>
	)
}
