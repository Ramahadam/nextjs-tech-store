import { SignupForm } from "@/features/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="bg-muted flex  flex-col items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm md:max-w-7xl">
        <SignupForm />
      </div>
    </div>
  );
}
