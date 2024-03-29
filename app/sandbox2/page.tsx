import { getAudioSrc } from "@/libs/supabase/getAudioSrc";

export default async function Page() {
	const id = "971e7af6-4fdc-444f-a1b4-9e3826d29707";

	const { url } = await getAudioSrc(id);


	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{JSON.stringify(url)}
		</main>
	);
}
