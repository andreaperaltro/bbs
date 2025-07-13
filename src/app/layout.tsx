import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./TopBar";

export const metadata: Metadata = {
  title: "Andrea Perato",
  description: "Portfolio and creative work of Andrea Perato.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Andrea Perato</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-[amiga4ever]">
        <TopBar />
        {children}
      </body>
    </html>
  );
}
