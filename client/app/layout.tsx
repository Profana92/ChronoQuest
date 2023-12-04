import "./globals.css";
import "the-new-css-reset/css/reset.css";

import Header from "@/components/global/Header";
import { Lato } from "next/font/google";
import type { Metadata } from "next";
import Provider from "@/context/provider";
import localFont from "next/font/local";

const oswald = localFont({
  src: "./Oswald-VariableFont_wght.ttf",
  display: "block",
  variable: "--font-oswald",
  preload: true,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "block",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "ChronoQuest",
  description: "Travel Thru Time!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${oswald.variable} ${lato.variable}`}>
      <body className="min-h-full font-lato text-Neutral-White bg-Neutral-Dark relative">
        <Provider>
          <Header />
          <main className="h-full">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
