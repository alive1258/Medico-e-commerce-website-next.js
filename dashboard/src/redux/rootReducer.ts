import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import sidebarSlice from "./features/sidebarSlice";
import themeSlice from "./features/themeSlice";
import otpSlice from "./features/otpSlice";
import authSlice from "./features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSideBarTree = persistReducer(persistConfig, sidebarSlice);

const persistedAuth = persistReducer(persistConfig, authSlice);

const persistedOtp = persistReducer(persistConfig, otpSlice);
// Combine all reducers
export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuth,
  otpTree: persistedOtp,
  adminTree: persistedSideBarTree,
  theme: themeSlice,
});

// Export reducer type for store configuration
export type RootReducerType = ReturnType<typeof rootReducer>;
