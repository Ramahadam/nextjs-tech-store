export interface User {
  id: string;
  firebaseUid: string;
  fullname?: string;
  email: string;
  isActive: boolean;
  role: "customer" | "admin";
  updatedAt?: string;
}

export interface UserProfile {
  fullname: string;
}

export interface GetCurrentUserResponse {
  success: string;
  user: User;
}

export interface UserState {
  user: User | null;
  error: string | null;
}
