import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })
	const { data } = await supabase.from("products").select()
	return <pre>{JSON.stringify(data, null, 2)}</pre>
}
