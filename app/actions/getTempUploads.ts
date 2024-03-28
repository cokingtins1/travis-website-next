import { useSession } from "@/libs/supabase/useSession";
import { unstable_cache } from "next/cache";

export const getTempUploads = unstable_cache(
	async () => {
		const { supabase } = await useSession();

		const { data } = await supabase.from("temp_uploads").select("*");

		return data;
	},
	["temp_uploads"],
	{ tags: ["temp_uploads"] }
);
