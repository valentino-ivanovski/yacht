import type { Metadata } from "next";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

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
        url: "https://i.imgur.com/FREPuvc.jpeg",
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
    images: ["https://i.imgur.com/FREPuvc.jpeg"],
  },
  icons: {
    icon: "/svgs/icon.ico",
    apple: "/svgs/appleicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/images/svgs/icon.ico" />
        <link rel="apple-touch-icon" href="/images/svgs/appleicon.png" />
      </Head>
      <body
        className={`${inter.className} ${inter.className} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
