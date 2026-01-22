import { SignupForm } from "./SignupForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";

// 1. Mock the hook globally
jest.mock("@/features/auth/hooks/useAuthActions", () => ({
  useAuthActions: jest.fn(),
}));

describe("SignupForm", () => {
  // --- MOCK FACTORY HELPER ---
  // This handles the repetitive setup for every test
  const setupForm = (overrides = {}) => {
    const user = userEvent.setup();
    const mocks = {
      isLoading: false,
      isLoadingGmail: false,
      handleSignupWithGoogle: jest.fn(),
      handleSignup: jest.fn(),
      setAuthError: jest.fn(),
      authError: null,
      ...overrides,
    };

    (useAuthActions as jest.Mock).mockReturnValue(mocks);

    const utils = render(<SignupForm />);

    return {
      ...utils,
      user,
      mocks,
    };
  };

  describe("Initial Rendering", () => {
    it("renders all signup form fields correctly", () => {
      setupForm();

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /create new account/i }),
      ).toBeInTheDocument();
    });

    it("shows the spinner and hides the text when isLoading is true", () => {
      setupForm({ isLoading: true });

      expect(screen.getByLabelText("loading")).toBeInTheDocument();
      expect(screen.queryByText(/create new account/i)).not.toBeInTheDocument();
    });
  });

  describe("Form Validation Behavior", () => {
    it("prevents submission and shows errors when fields are empty", async () => {
      const { user, mocks } = setupForm();

      const submitButton = screen.getByRole("button", {
        name: /create new account/i,
      });
      await user.click(submitButton);

      expect(
        await screen.findByText(/full name must be at least 4 characters/i),
      ).toBeInTheDocument();
      expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();

      expect(mocks.handleSignup).not.toHaveBeenCalled();
    });

    it("shows error message when passwords do not match", async () => {
      const { user, mocks } = setupForm();

      await user.type(screen.getByLabelText(/full name/i), "Mohamed Adam");
      await user.type(screen.getByLabelText(/email/i), "test@gmail.com");
      await user.type(screen.getByLabelText(/^password$/i), "password123");
      await user.type(
        screen.getByLabelText(/confirm password/i),
        "different456",
      );

      await user.click(
        screen.getByRole("button", { name: /create new account/i }),
      );

      expect(
        await screen.findByText("Passwords don't match"),
      ).toBeInTheDocument();
      expect(mocks.handleSignup).not.toHaveBeenCalled();
    });
  });

  describe("Successful Submission & Server Errors", () => {
    it("calls handleSignup when all fields are valid", async () => {
      const { user, mocks } = setupForm();

      await user.type(screen.getByLabelText(/full name/i), "Mohamed Adam");
      await user.type(screen.getByLabelText(/email/i), "test@gmail.com");
      await user.type(screen.getByLabelText(/^password$/i), "password123");
      await user.type(
        screen.getByLabelText(/confirm password/i),
        "password123",
      );

      await user.click(
        screen.getByRole("button", { name: /create new account/i }),
      );

      await waitFor(() => expect(mocks.handleSignup).toHaveBeenCalled());
    });

    it("displays error message when the email is already registered (Dynamic State)", async () => {
      const user = userEvent.setup();
      let dynamicError: string | null = null;

      // We define the logic to flip the error state
      const handleSignupMock = jest.fn(() => {
        dynamicError = "Email is already registered";
      });

      // Use mockImplementation to allow the error to 'arrive' after the click
      (useAuthActions as jest.Mock).mockImplementation(() => ({
        isLoading: false,
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        handleSignup: handleSignupMock,
        setAuthError: jest.fn(),
        authError: dynamicError,
      }));

      const { rerender } = render(<SignupForm />);

      // Fill valid data
      await user.type(screen.getByLabelText(/full name/i), "Mohamed Adam");
      await user.type(screen.getByLabelText(/email/i), "exists@gmail.com");
      await user.type(screen.getByLabelText(/^password$/i), "password123");
      await user.type(
        screen.getByLabelText(/confirm password/i),
        "password123",
      );

      await user.click(
        screen.getByRole("button", { name: /create new account/i }),
      );

      // Trigger rerender to reflect the new dynamicError value
      rerender(<SignupForm />);

      expect(
        await screen.findByText(/Email is already registered/i),
      ).toBeInTheDocument();
    });
  });

  describe("Google Authentication", () => {
    it("calls handleSignupWithGoogle and shows loading spinner", async () => {
      const user = userEvent.setup();
      let googleLoading = false;
      const googleSpy = jest.fn(() => {
        googleLoading = true;
      });

      (useAuthActions as jest.Mock).mockImplementation(() => ({
        isLoading: false,
        isLoadingGmail: googleLoading,
        handleSignupWithGoogle: googleSpy,
        handleSignup: jest.fn(),
        setAuthError: jest.fn(),
        authError: null,
      }));

      const { rerender } = render(<SignupForm />);

      const googleBtn = screen.getByRole("button", {
        name: /Continue with Google/i,
      });
      await user.click(googleBtn);

      expect(googleSpy).toHaveBeenCalled();

      rerender(<SignupForm />);
      expect(await screen.findByLabelText("loading")).toBeInTheDocument();
    });
  });
});
