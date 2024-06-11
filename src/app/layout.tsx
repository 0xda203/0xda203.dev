import React from 'react';
import { Inter } from 'next/font/google';
import Profile from './components/Profile';
import Scroll from './components/Scroll';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '0xda203.dev',
  description: 'Fullstack Developer | PCD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900`}>
          <Profile />
          <Scroll />
      </body>
    </html>
  );
}
