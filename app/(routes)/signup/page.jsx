import SupabaseSignUpForm from "@/app/components/SupabaseSignUpForm/SupabaseSignUpForm";

export default function Page() {
  return (
    <main className="h-[32rem] flex justify-center items-center">
      <div className="flex flex-col items-center p-8">
        <h1>Sign Up</h1>
        <SupabaseSignUpForm />
      </div>
    </main>
  );
}
