import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Inter } from 'next/font/google'
 
const inter = Inter({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Yacht Moment - Greenline 48 Flybridge Charter",
  description: "Discover the Greenline 48 Flybridge - luxury, hybrid innovation, and comfort combined in Greenline's premier Adriatic yacht charter experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
