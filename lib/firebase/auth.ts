import { FirebaseError } from "firebase/app";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
} from "./config";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

export const signupWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    const token = await firebaseUser.getIdToken();

    return { token, user: firebaseUser };
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      return {
        errorCode: err.code,
        errorMessage: err.message,
        email: err.customData?.email,
        credential: GoogleAuthProvider.credentialFromError(err),
      };
    } else {
      console.log("Unexpected auth error:", err);

      return { errorCode: "unknown", errorMessage: "Something went worng" };
    }
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPasswordLink = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }

  return {
    message:
      "If an account with this email exists, a password reset link has been sent",
  };
};

export const resetPassword = async (
  newPassword: string,
  actionCode: string | null
) => {
  if (actionCode)
    try {
      // Verify if the action code is valid

      await verifyPasswordResetCode(auth, actionCode);

      try {
        // Save the new password
        await confirmPasswordReset(auth, actionCode, newPassword);

        // Redirect the user to dashboard for now.
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
};
