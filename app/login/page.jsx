import { useSession } from "@/libs/supabase/useSession"
import SupabaseLoginForm from "../components/SupabaseLoginForm/SupabaseLoginForm"

export default async function Page() {
	const { session } = await useSession()

	return (
		<main className="h-[32rem] flex justify-center items-center">
			<div className=" flex flex-col items-center p-8">
				<h1>Log in</h1>
				<SupabaseLoginForm session={session} />
			</div>
		</main>
	)
}
