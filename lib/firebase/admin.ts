import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

// Prevent re-initialization in dev / hot reload
const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(firebaseAdminConfig),
      })
    : getApps()[0];

export const adminAuth = getAuth(app);
