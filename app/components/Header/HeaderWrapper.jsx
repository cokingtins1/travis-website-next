import { useSession } from "@/libs/supabase/useSession"
import Header from "./Header"

export default async function HeaderWrapper() {
	const { session } = await useSession()

	return <Header session={session} />
}
