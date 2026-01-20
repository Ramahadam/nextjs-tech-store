import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn() }),
}));

jest.mock("@/features/auth/hooks/useAuthActions", () => ({
  useAuthActions: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    (useAuthActions as jest.Mock).mockReturnValue({
      login: jest.fn(),
      isLoading: false,
      authError: null,
      setAuthError: jest.fn(),
    });
  });

  it("renders login form fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
