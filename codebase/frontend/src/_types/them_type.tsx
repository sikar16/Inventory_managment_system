export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  muiTheme: Theme;
  themeData: Theme;
  setThemeData: (themeData: Theme) => void;
};
