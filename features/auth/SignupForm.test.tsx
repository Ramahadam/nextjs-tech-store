import { SignupForm } from "./SignupForm";
import { render, screen } from "@testing-library/react";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";

// jest.mock("next/navigation", () => ({
//   useRouter: () => ({ replace: jest.fn() }),
//   useSearchParams: () => ({ get: jest.fn() }),
// }));

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
});
