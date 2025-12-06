import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "Remote India - Best Remote Jobs for Indian Developers",
    template: "%s | Remote India",
  },
  description: "Find the best high-paying remote software developer jobs for Indian talent. Work from anywhere, earn global salaries.",
  keywords: ["remote jobs", "india", "software developer", "work from home", "remote work", "developer jobs", "react", "node.js"],
  authors: [{ name: "Remote India Team" }],
  creator: "Remote India",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Remote India - Best Remote Jobs for Indian Developers",
    description: "Find the best high-paying remote software developer jobs for Indian talent.",
    siteName: "Remote India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote India - Best Remote Jobs for Indian Developers",
    description: "Find the best high-paying remote software developer jobs for Indian talent.",
    creator: "@remoteindia",
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
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex flex-col gap-6">
            <Header />
            <Navigation />
            <main className="mt-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
