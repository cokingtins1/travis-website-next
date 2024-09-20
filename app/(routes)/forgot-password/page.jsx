import ForgotPasswordForm from "@/app/components/ForgotPasswordForm/ForgotPasswordForm";

export default function Page() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col items-center gap-4 min-w-[734px] p-8">
        <h1>Password Reset</h1>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
