import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import sidebarSlice from "./features/sidebarSlice";
import otpSlice from "./features/otpSlice";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cartSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSideBarTree = persistReducer(persistConfig, sidebarSlice);
const persistedAuth = persistReducer(persistConfig, authSlice);
const persistedOtp = persistReducer(persistConfig, otpSlice);
const persistedCart = persistReducer(persistConfig, cartSlice);

// Combine all reducers
export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuth,
  otpTree: persistedOtp,
  cartTree: persistedCart,
  adminTree: persistedSideBarTree,
});

// Export reducer type for store configuration
export type RootReducerType = ReturnType<typeof rootReducer>;
