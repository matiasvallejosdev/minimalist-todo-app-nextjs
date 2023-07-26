import '@/src/styles/globals.css'
import '@/src/styles/tailwind.css'

import {IBM_Plex_Sans as CustomFont} from 'next/font/google';
import ThemeModeProvider from "../src/context/ThemeModeProvider";

const customFont = CustomFont({
    subsets: ['latin'],
    variable: '--font-custom',
    weight: ['400', '500', '600', '700'],
});

export default function RootLayout({children}) {
    return (
        <html lang="en" className={`${customFont.variable}`}>
        <head>
            <title>Minimalist</title>
        </head>
        <body
            className="relative bg-white dark:bg-slate-900 md:bg-white/90 md:backdrop-blur-sm dark:md:bg-slate-900/90">
            <ThemeModeProvider key="themeprovider">
                {children}
            </ThemeModeProvider>
        </body>
        </html>
    )
}