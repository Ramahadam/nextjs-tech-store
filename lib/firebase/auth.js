import firebaseApp from "@/lib/firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth();

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    throw { errorCode, errorMessage };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    throw { errorCode, errorMessage };
  }
};

export const logOutUser = async () => {
  try {
    await signOut.auth();
  } catch (error) {
    throw error;
  }
};
