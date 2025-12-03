import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Mini BookMyShow",
  description: "Book your movie tickets online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${syne.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
      </body>
    </html>
  );
}

