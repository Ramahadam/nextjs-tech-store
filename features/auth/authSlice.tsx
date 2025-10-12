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
    setCredntials: (state: AuthState, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state: AuthState) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredntials, logout } = authSlice.actions;
export default authSlice.reducer;
