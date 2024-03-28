import { getSession } from "@/libs/supabase/getSession";
import { unstable_cache } from "next/cache";

export const getTempUploads = unstable_cache(
	async () => {
		const { supabase } = await getSession();

		const { data } = await supabase.from("temp_uploads").select("*");

		return data;
	},
	["temp_uploads"],
	{ tags: ["temp_uploads"] }
);
