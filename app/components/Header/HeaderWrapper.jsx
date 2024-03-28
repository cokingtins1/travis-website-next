import { getSession } from "@/libs/supabase/getSession";
import HeaderDrawer from "./HeaderDrawer";

export default async function HeaderWrapper() {
	const { session, isAdmin } = await getSession();

	return <HeaderDrawer session={session} isAdmin={isAdmin} />;
}
