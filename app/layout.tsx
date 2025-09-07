import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientWrapper from "./ClientWrapper";

const interFontFamily = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech-store | Home",
  description: "Buy all your tech",
  keywords: ["Ecommerce", "Laptops", "desktops"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${interFontFamily.variable} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
