"use client"

import { fetchStoreData } from "@/libs/supabase/fetchStoreData"
import { useEffect, useState } from "react"

export default function Page() {
	const [productData, setProductData] = useState([])

	useEffect(() => {
		const fetchDataAndSetProducts = async () => {
			const { products } = await fetchStoreData()
			setProductData((prev) => {})
			// console.log("productData", productData)
		}

		fetchDataAndSetProducts()
	}, [])

	return (
		<>
			<div className="grid grid-cols-2"></div>
		</>
	)
}
