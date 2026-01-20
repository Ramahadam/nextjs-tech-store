import { render, screen, fireEvent } from "@testing-library/react";
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
  describe("when not loading", () => {
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
      expect(
        screen.getByRole("button", { name: /login/i }),
      ).toBeInTheDocument();
    });
  });

  describe("when loading", () => {
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockReturnValue({
        login: jest.fn(),
        isLoading: true,
        authError: null,
        setAuthError: jest.fn(),
      });
    });
    it("shows loading spinner", () => {
      render(<LoginForm />);

      expect(screen.getByLabelText("loading")).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /login/i }),
      ).not.toBeInTheDocument();
    });
  });
  describe("when firebase error occur", () => {
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockReturnValue({
        login: jest.fn(),
        isLoading: true,
        authError: "Invalid email or password",
        setAuthError: jest.fn(),
      });
    });
    it("shows error message", () => {
      render(<LoginForm />);

      expect(
        screen.getByText(/Invalid email or password/i),
      ).toBeInTheDocument();
    });
  });
});
