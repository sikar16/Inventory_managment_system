import { createContext, useContext, useEffect, useState } from "react";
import {
  ThemeProviderProps,
  Theme,
  ThemeProviderState,
} from "../_types/them_type";
import { createTheme } from "@mui/material";

const initialState: ThemeProviderState = {
  muiTheme: "dark",
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
  const muiTheme = createTheme({
    palette: {
      mode: themeData == "dark" ? "dark" : "light",
    },
  });

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
    muiTheme,
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

export const useThemeData = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
