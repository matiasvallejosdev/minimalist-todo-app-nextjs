'use client';
import {ThemeProvider as NextTheme} from "next-themes";

const ThemeProvider = ({ children }) => (
  <NextTheme attribute="class">
    {children}
  </NextTheme>
);

export default ThemeProvider;
