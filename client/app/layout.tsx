import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "the-new-css-reset/css/reset.css";
import Provider from "@/context/provider";
import Header from "@/components/global/Header";
import { Oswald, Lato } from "next/font/google";

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
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
