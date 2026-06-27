import { createSlice,  } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type TUser = {
  userId: string;
  role: string;
};

type TAuthState = {
  user: TUser | null;
};

const initialState: TAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { storeUser, logout } = authSlice.actions;
export default authSlice.reducer;

//  SELECTORS
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.user);
