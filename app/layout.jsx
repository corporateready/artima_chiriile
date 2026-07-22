import React from "react";
import { Montserrat } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.scss";
import Favicon from "./favicon.png";
import CookieConsent from "./components/cookie/ConsentManager";

const inter = Montserrat({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Oficii spre chirie ARTIMA Business & Lifestyle",
  description:
    "ARTIMA Business & Lifestyle oferă spre închiriere birouri moderne echipate cu facilități excepționale, încadrate într-un ecosistem complet dedicat unui antreprenoriat productiv și eficient.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className={`${inter.className} ${roboto.variable}`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
