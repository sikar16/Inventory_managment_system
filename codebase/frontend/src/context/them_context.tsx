import { createContext, useContext, useEffect, useState } from "react";
import {
  ThemeProviderProps,
  Theme,
  ThemeProviderState,
} from "../_types/them_type";

const initialState: ThemeProviderState = {
  themeData: "system",
  setThemeData: () => null,
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) => {
  const [themeData, setThemeData] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (themeData === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(themeData);
  }, [themeData]);

  const value = {
    themeData,
    setThemeData: (themeData: Theme) => {
      localStorage.setItem(storageKey, themeData);
      setThemeData(themeData);
    },
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
