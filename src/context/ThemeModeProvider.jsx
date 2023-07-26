'use client';
import {ThemeProvider} from "next-themes";

const ThemeModeProvider = ({ children }) => (
  <ThemeProvider attribute="class">
    {children}
  </ThemeProvider>
);

export default ThemeModeProvider;
