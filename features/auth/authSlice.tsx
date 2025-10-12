import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token?: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredntials: (
      state: AuthState,
      action: PayloadAction<Partial<AuthState>>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logut: (state: AuthState) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
