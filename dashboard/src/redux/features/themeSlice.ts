import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: (localStorage.getItem("theme") as ThemeMode) || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      document.documentElement.setAttribute("data-theme", action.payload);
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme(state) {
      const next = state.mode === "dark" ? "light" : "dark";
      state.mode = next;
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
