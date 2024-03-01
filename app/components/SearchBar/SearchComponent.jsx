"use client"

// import getPosts from "@/libs/getPosts"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import SearchBar from "./SearchBar"
import SearchResultList from "./SearchResultList"
import { usePathname, useSearchParams } from 'next/navigation'

export default function SearchComponent() {
	const [posts, setPosts] = useState([])
	const [query, setQuery] = useState("")
	const anchorRef = useRef()
	
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// const createQueryString = useCallback(
	// 	(name, value) => {
	// 		const params = new URLSearchParams(searchParams)
	// 		params.set(name, value)

	// 		return params.toString()
	// 	}, [searchParams]
	// )

	// useEffect(() => {
	// 	pathname + '?' + createQueryString(query)

	// }, [query])

	

	const filteredItems = useMemo(() => {
		return posts.filter((post) => {
			return post.title.includes(query) || post.body.includes(query)
		})
	}, [posts, query])



	useEffect(() => {
		// const fetchPost = async () => {
		// 	const json = await getPosts()
		// 	setPosts(json)
		// }
		// fetchPost()
		// // getPosts().then((json) => {
		// // 	setPosts(json)
		// // 	setSearchResults(json)
		// // })
	}, [])

	return (
		<>
			<div className='w-full' ref={anchorRef}>
				<SearchBar posts={posts} query={query} setQuery={setQuery} />
				{/* <div ref={anchorRef}></div> */}
				{query.length > 0 && (
					<>
						<SearchResultList
							anchorEl={anchorRef.current}
							filteredItems={filteredItems}
							query={query}
							setQuery={setQuery}
						/>
					</>
				)}
			</div>
		</>
	)
}
