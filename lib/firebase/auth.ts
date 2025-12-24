import { FirebaseError } from "firebase/app";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "./config";

export const singupWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    const user = result.user;

    return { token, user };
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
