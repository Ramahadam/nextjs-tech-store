import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  uid?: string;
  profile?: string;
  userName?: string;
}

interface UserState {
  user?: UserProfile | null;
  error?: string | null;
}

const initialState: UserState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state: UserState, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setProfile, logout } = userSlice.actions;

export default userSlice.reducer;
