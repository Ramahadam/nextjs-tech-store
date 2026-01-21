import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  describe("when empty submit", () => {
    const handleLoginMock = jest.fn();

    (useAuthActions as jest.Mock).mockReturnValue({
      login: jest.fn(),
      handelLoginUser: handleLoginMock,
      isLoading: false,
      authError: null,
      setAuthError: jest.fn(),
    });
    it("email is required", async () => {
      render(<LoginForm />);

      //Act
      const submitForm = screen.getByRole("form");
      fireEvent.click(submitForm);

      expect(
        await screen.findByText(/Invalid email or password/i),
      ).toBeInTheDocument();
      expect(handleLoginMock).not.toHaveBeenCalled();
    });
  });

  describe("when fill and submit", () => {
    const handleLoginMock = jest.fn();

    beforeEach(() =>
      (useAuthActions as jest.Mock).mockReturnValue({
        login: jest.fn(),
        handelLoginUser: handleLoginMock,
        isLoading: false,
        authError: null,
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        setAuthError: jest.fn(),
      }),
    );

    it("submits form with correct values", async () => {
      // Arrange
      render(<LoginForm />);

      //Act
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "test@gmail.com" },
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "12345678" },
      });

      const submitForm = screen.getByRole("form");

      fireEvent.submit(submitForm);

      // Assert
      await waitFor(() => expect(handleLoginMock).toHaveBeenCalledTimes(1));
      expect(handleLoginMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@gmail.com",
          password: "12345678",
        }),
        expect.anything(),
      );
    });
  });
});
