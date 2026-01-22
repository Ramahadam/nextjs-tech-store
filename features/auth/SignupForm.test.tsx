import { SignupForm } from "./SignupForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";

jest.mock("@/features/auth/hooks/useAuthActions", () => ({
  useAuthActions: jest.fn(),
}));

describe("SignupForm", () => {
  // Describe render feilds
  describe("when not loading", () => {
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockReturnValue({
        isLoading: false,
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        handleSignup: jest.fn(),
        setAuthError: jest.fn(),
        authError: null,
      });
    });

    it("renders signup form feilds", () => {
      // Arrange
      render(<SignupForm />);

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });
  });

  describe("while loading", () => {
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockReturnValue({
        isLoading: true,
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        handleSignup: jest.fn(),
        setAuthError: jest.fn(),
        authError: null,
      });
    });

    it("show spinner", () => {
      //Arrange
      render(<SignupForm />);

      // Act
      const loading = screen.getByLabelText("loading");
      const signupButton = screen.queryByRole("button", {
        name: /create new account/i,
      });
      expect(loading).toBeInTheDocument();
      expect(signupButton).not.toBeInTheDocument();
    });
  });

  describe("when empty submit", () => {
    const handleSignupMock = jest.fn();
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockReturnValue({
        isLoading: false,
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        handleSignup: handleSignupMock,
        setAuthError: jest.fn(),
        authError: null,
      });
    });

    it("shows error messages", async () => {
      const user = userEvent.setup();
      //Arrange
      render(<SignupForm />);

      // Act
      const submitButton = screen.getByRole("button", {
        name: /create new account/i,
      });
      await user.click(submitButton);

      expect(
        await screen.findByText(/full name must be at least 4 characters/i),
      );
      expect(await screen.findByText(/invalid email/i));
      expect(
        await screen.findByText(/password must be at least 8 characters/i),
      );

      expect(handleSignupMock).not.toHaveBeenCalled();
    });
  });

  describe("when fill and submit", () => {
    const handleSignupMock = jest.fn();
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockReturnValue({
        isLoading: false,
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        handleSignup: handleSignupMock,
        setAuthError: jest.fn(),
        authError: null,
      });
    });

    it("submits the form with correct values", async () => {
      // 1. Setup the user interaction session
      const user = userEvent.setup();

      //Arrange
      render(<SignupForm />);

      //Act -  Mandatory: await the action
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);

      await user.type(nameInput, "Mohamed Adam");
      await user.type(emailInput, "test@gmail.com");
      await user.type(passwordInput, "12345678");
      await user.type(confirmPasswordInput, "12345678");

      const buttonSubmit = screen.getByRole("button", {
        name: /create new account/i,
      });

      await user.click(buttonSubmit);

      //Assert
      await waitFor(() => expect(handleSignupMock).toHaveBeenCalled());
    });
  });
  describe("when passwords do not match", () => {
    const handleSignupMock = jest.fn();
    beforeEach(() => {
      (useAuthActions as jest.Mock).mockReturnValue({
        isLoading: false,
        isLoadingGmail: false,
        handleSignupWithGoogle: jest.fn(),
        handleSignup: handleSignupMock,
        setAuthError: jest.fn(),
        authError: null,
      });
    });

    it("submits the form with incorrect password", async () => {
      // 1. Setup the user interaction session
      const user = userEvent.setup();

      //Arrange
      render(<SignupForm />);

      //Act -  Mandatory: await the action
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);

      await user.type(nameInput, "Mohamed Adam");
      await user.type(emailInput, "test@gmail.com");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "password456");

      const buttonSubmit = screen.getByRole("button", {
        name: /create new account/i,
      });

      await user.click(buttonSubmit);

      //Assert

      expect(
        await screen.findByText("Passwords don't match"),
      ).toBeInTheDocument();
      await waitFor(() => expect(handleSignupMock).not.toHaveBeenCalled());
    });
  });
});
