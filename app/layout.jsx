import React from "react";
import { Montserrat } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import Favicon from "./favicon.png";

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
      <head>
        {/* Google Tag Manager */}
        <Script
          async
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push(
                {'gtm.start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                console.log("Tag was connected")
              })(window,document,'script','dataLayer','GTM-KG9D2CBQ');
            `,
          }}
        />
      </head>

      <body className={`${inter.className} ${roboto.variable}`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-KG9D2CBQ" 
              height="0" 
              width="0" 
              style="display:none;visibility:hidden">
            </iframe>
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
