import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remote India",
  description: "Remote jobs for Developer of all sorts!",
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
