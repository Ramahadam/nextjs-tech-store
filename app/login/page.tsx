import { LoginForm } from "@/features/auth/LoginForm";

export default function Page() {
  return (
    <div className="bg-muted flex  flex-col items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm md:max-w-7xl">
        <LoginForm />
      </div>
    </div>
  );
}
