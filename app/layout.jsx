import '@/src/styles/globals.css';
import '@/src/styles/tailwind.css';
import { SITE } from '@/src/config';

import { Roboto as CustomFont } from 'next/font/google';
import Providers from '@/src/context/Providers';

const customFont = CustomFont({
  subsets: ['latin'],
  variable: '--font-custom',
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: SITE.title,
  description: SITE.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${customFont.className} antialiased relative`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
