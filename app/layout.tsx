import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Goodluck Wile - Software Engineer",
  description: "Modern portfolio of Goodluck Wile, a passionate software engineer specializing in full-stack development, cloud technologies, and innovative solutions.",
  keywords: "Goodluck Wile, software engineer, full-stack developer, portfolio, web development, cloud, react, node.js",
  authors: [{ name: "Goodluck Wile" }],
  creator: "Goodluck Wile",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://goodluckwile.dev",
    title: "Goodluck Wile - Software Engineer",
    description: "Modern portfolio showcasing my journey as a software engineer",
    siteName: "Goodluck Wile Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goodluck Wile - Software Engineer",
    description: "Modern portfolio showcasing my journey as a software engineer",
    creator: "@goodluckwile",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
