"use client"

export const updateQueryParam = (
	paramName,
	value,
	searchParams,
	pathname,
	router
) => {
	const current = new URLSearchParams(Array.from(searchParams.entries()))

	if (!value) {
		current.delete(paramName)
	} else {
		current.set(paramName, value)
	}

	const search = current.toString()
	const query = search ? `?${search}` : ""

	router.push(`${pathname}${query}`, { scroll: false })
	// router.replace(`${pathname}${query}`, undefined, { shallow: true })
	router.refresh()
}
