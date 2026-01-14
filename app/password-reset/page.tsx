import { ResetPasswordForm } from "@/features/auth/ResetPasswordForm";

export default function Page() {
  return (
    <div className="bg-muted flex  flex-col items-center justify-center p-2 md:p-10 ">
      <div className="w-full max-w-sm md:max-w-7xl">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
