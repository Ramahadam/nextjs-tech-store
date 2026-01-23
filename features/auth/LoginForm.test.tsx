import { render, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn() }),
}));

jest.mock("@/features/auth/hooks/useAuthActions", () => ({
  useAuthActions: jest.fn(),
}));

describe("LoginForm", () => {
  const setupForm = (overrides = {}) => {
    const user = userEvent.setup();
    const mocks = {
      login: jest.fn(),
      isLoading: false,
      authError: null,
      setAuthError: jest.fn(),
      isLoadingGmail: false,
      handleSignupWithGoogle: jest.fn(),
      handelLoginUser: jest.fn(),
      ...overrides,
    };

    (useAuthActions as jest.Mock).mockReturnValue(mocks);

    const utils = render(<LoginForm />);

    return {
      ...utils,
      mocks,
      user,
    };
  };

  describe("when not loading", () => {
    it("renders login form fields", () => {
      setupForm();

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /login/i }),
      ).toBeInTheDocument();
    });
  });

  describe("when loading", () => {
    it("shows loading spinner", () => {
      setupForm({ isLoading: true });

      expect(screen.getByLabelText("loading")).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /login/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("when firebase error occur", () => {
    const user = userEvent.setup();
    let authDynamicError: string | null = null;

    const handleLoginMock = jest.fn(
      () => (authDynamicError = "Invalid email or password"),
    );
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockImplementation(() => ({
        login: jest.fn(),
        isLoading: false,
        authError: authDynamicError,
        setAuthError: jest.fn(),
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        handelLoginUser: handleLoginMock,
      }));
    });

    it("shows error message", async () => {
      const { rerender } = render(<LoginForm />);

      expect(
        screen.queryByText(/Invalid email or password/i),
      ).not.toBeInTheDocument();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, "test@testing.com");
      await user.type(passwordInput, "password1234");

      const submitButton = screen.getByRole("button", { name: /login/i });
      user.click(submitButton);

      await waitFor(() => expect(handleLoginMock).toHaveBeenCalled());

      rerender(<LoginForm />);

      expect(
        await screen.findByText(/Invalid email or password/i),
      ).toBeInTheDocument();
    });
  });

  describe("when empty submit", () => {
    it("email is required", async () => {
      const handleLoginMock = jest.fn();
      const { user } = setupForm({ handelLoginUser: handleLoginMock });
      //Act
      const submitButton = screen.getByRole("button", { name: /login/i });
      user.click(submitButton);

      expect(
        await screen.findByText(/Invalid email address/i),
      ).toBeInTheDocument();

      expect(
        await screen.findByText(/Password must be at least 8 characters/i),
      ).toBeInTheDocument();
      expect(handleLoginMock).not.toHaveBeenCalled();
    });
  });

  describe("when fill and submit", () => {
    it("submits form with correct values", async () => {
      // Arrange

      const handleLoginMock = jest.fn();
      const { user } = setupForm({ handelLoginUser: handleLoginMock });
      //Act
      await user.type(screen.getByLabelText(/email/i), "test@gmail.com");

      await user.type(screen.getByLabelText(/password/i), "12345678");

      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.click(submitButton);

      // Assert
      await waitFor(() => expect(handleLoginMock).toHaveBeenCalledTimes(1));
    });
  });
});
