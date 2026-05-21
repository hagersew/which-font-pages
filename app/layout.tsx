import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whichfont.dev"),
  title: "Which Font? — Identify Fonts Instantly on Any Website",
  description:
    "Inspect fonts, typography, colors, and CSS styles instantly with Which Font? — the modern Chrome extension for developers and designers.",
  openGraph: {
    title: "Which Font? — Identify Fonts Instantly on Any Website",
    description:
      "Inspect fonts, typography, colors, and CSS styles instantly with Which Font? — the modern Chrome extension for developers and designers.",
    url: "https://whichfont.dev",
    siteName: "Which Font?",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Which Font? — Identify Fonts Instantly on Any Website",
    description:
      "Inspect fonts, typography, colors, and CSS styles instantly with Which Font? — the modern Chrome extension for developers and designers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('which-font-theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
