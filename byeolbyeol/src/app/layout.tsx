import Header from './(components)/_layout/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '별별스토어 (BYBL)',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
