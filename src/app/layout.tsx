import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAMI — The Crypto Neobank on Stellar | Spend USDC & XLM with Visa",
  description:
    "Fund virtual and physical Visa cards on the Stellar network with USDC or XLM. Spend crypto globally with instant settlement, zero foreign transaction fees, and non-custodial Soroban vaults.",
  openGraph: {
    title: "KAMI — The Crypto Neobank on Stellar",
    description: "Fund with USDC & XLM. Spend real money worldwide with Visa cards on Stellar.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
