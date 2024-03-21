import { useSession } from "@/libs/supabase/useSession"
import HeaderDrawer from "./HeaderDrawer"

export default async function HeaderWrapper() {
	const { session } = await useSession()

	return <HeaderDrawer session={session} />
}
