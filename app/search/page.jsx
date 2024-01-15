"use client"

import { useRouter } from "next/navigation"

export default function Page() {
	const router = useRouter()
    let query = ''

    if(router.query){
        ({query} = router.query)
    }
	return <div>{JSON.stringify(query)}</div>
}
