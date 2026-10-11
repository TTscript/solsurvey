import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://solsurvey.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SolSurvey — Verified Surveys, Instant Rewards",
    template: "%s | SolSurvey",
  },
  description:
    "Survey platform with Solana wallet verification and instant micropayments. Get high-quality data from real users.",
  applicationName: "SolSurvey",
  keywords: [
    "Solana",
    "surveys",
    "wallet verification",
    "micropayments",
    "research",
    "rewards",
  ],
  authors: [{ name: "SolSurvey" }],
  creator: "SolSurvey",
  publisher: "SolSurvey",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SolSurvey",
    title: "SolSurvey — Verified Surveys, Instant Rewards",
    description:
      "Wallet-verified surveys with instant Solana micropayments. High-quality responses from real users.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SolSurvey — Rewarded surveys on Solana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SolSurvey — Verified Surveys, Instant Rewards",
    description:
      "Verified surveys and instant rewards on Solana. Real users, real data.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
