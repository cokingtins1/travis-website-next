"use client"

import React, { createContext, useCallback, useContext } from "react"

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const updateQueryParam = (paramName, value) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()))

		if (paramName === "tags") {
			const currentTags = current.getAll("tags")
			if (!value) {
				current.delete("tags")
			} else {
				const updatedTags = value
					.split(",")
					.filter((tag) => tag.trim() !== "")
				const newTags = [...new Set([...currentTags, ...updatedTags])]
				current.set("tags", newTags.join(","))
			}
		} else {
			if (!value) {
				current.delete(paramName)
			} else {
				current.set(paramName, value)
			}
		}

		const search = current.toString()
		const query = search ? `?${search}` : ""

		router.push(`${pathname}${query}`, { scroll: false })
		// router.replace(`${pathname}${query}`, undefined, { shallow: true })
		router.refresh()
	}

	const createBPMQuery = useCallback(
		(name, value) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const getSearchParam = (query) => {
		return searchParams.get(query)
	}

	const clearSearch = () => {
		router.replace("/store", undefined, { shallow: true })
	}

	const values = {
		router,
		pathname,
		searchParams,
		updateQueryParam,
		createBPMQuery,
		getSearchParam,
		clearSearch,
	}

	return (
		<SearchContext.Provider value={values}>
			{children}
		</SearchContext.Provider>
	)
}

export const useSearch = () => {
	return useContext(SearchContext)
}
