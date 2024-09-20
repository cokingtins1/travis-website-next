import { getSession } from "@/libs/supabase/getSession";
// import SupabaseLoginForm from "../components/SupabaseLoginForm/SupabaseLoginForm";
import SupabaseLoginForm from "@/app/components/SupabaseLoginForm/SupabaseLoginForm";

// app/components/SupabaseLoginForm/SupabaseLoginForm.jsx

export default async function Page() {
  const { session } = await getSession();

  return (
    <main className="h-[32rem] flex justify-center items-center">
      <div className=" flex flex-col items-center p-8">
        <h1>Log in</h1>
        <SupabaseLoginForm session={session} />
      </div>
    </main>
  );
}
