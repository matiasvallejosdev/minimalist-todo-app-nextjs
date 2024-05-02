'use client';
import AuthProvider from './AuthProvider';
import ThemeModeProvider from './ThemeProvider';

export default function Providers({ children }) {
  return (
    <>
      <AuthProvider>
        <ThemeModeProvider key="themeprovider">{children}</ThemeModeProvider>
      </AuthProvider>
    </>
  );
}
