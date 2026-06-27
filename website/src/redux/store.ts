import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { baseApi } from "./api/baseApi";

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["items", "register"],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.MODE !== "production",
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
