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
  description:
    "Discover the Greenline 48 Flybridge - luxury, hybrid innovation, and comfort combined in Greenline's premier Adriatic yacht charter experience.",
  openGraph: {
    title: "Yacht Moment - Greenline 48 Flybridge Charter",
    description:
      "Discover the Greenline 48 Flybridge - luxury, hybrid innovation, and comfort combined in Greenline's premier Adriatic yacht charter experience.",
    url: "https://yachtmoment.com", 
    siteName: "Yacht Moment",
    images: [
      {
        url: "https://imgur.com/FREPuvc",
        width: 1224,
        height: 672,
        alt: "Greenline 48 Flybridge in the Adriatic Sea",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht Moment - Greenline 48 Flybridge Charter",
    description:
      "Discover the Greenline 48 Flybridge - luxury, hybrid innovation, and comfort combined in Greenline's premier Adriatic yacht charter experience.",
    images: ["https://imgur.com/FREPuvc"],
  },
  icons: {
    icon: "svgs/icon.ico",
    apple: "svgs/appleicon.png",
  },
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
