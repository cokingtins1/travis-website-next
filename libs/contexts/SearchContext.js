"use client"

import React, { createContext, useCallback, useContext } from "react"

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
	const router = useRouter()
	const pathname = usePathname()
	const sParams = useSearchParams()

	const updateQueryParam = (paramName, selectedValues) => {
		const current = new URLSearchParams(Array.from(sParams.entries()))

		if (selectedValues.length === 0) {
			current.delete(paramName)
		} else {
			current.set(paramName, selectedValues)
		}

		const search = current.toString()
		const query = search ? `?${search}` : ""

		router.push(`${pathname}${query}`, { scroll: false })
		router.refresh()
	}

	const createBPMQuery = useCallback(
		(name, value) => {
			const params = new URLSearchParams(sParams)
			params.set(name, value)

			return params.toString()
		},
		[sParams]
	)

	const getSearchParam = (query) => {
		return sParams.get(query)
	}

	const clearSearch = () => {
		router.replace("/store", undefined, { shallow: true })
		// router.push("/store")
	}

	const values = {
		router,
		pathname,
		sParams,
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
