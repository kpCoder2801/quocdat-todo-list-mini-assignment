import { createStore } from "@/utils/create-store";
import type { Theme } from "../types/theme";

type State = {
  theme: Theme;
};

type Actions = {
  setTheme: (
    _: State["theme"] | ((prev: State["theme"]) => State["theme"])
  ) => void;
};

const initialState: State = {
  theme: "grid",
};

const useTheme = createStore<State & Actions>(
  (set) => ({
    ...initialState,
    setTheme: (theme) =>
      set((prev) => ({
        theme: typeof theme === "function" ? theme(prev.theme) : theme,
      })),
  }),
  {
    name: "theme-store",
  }
);

export { useTheme };
