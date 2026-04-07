import type { Metadata } from "next";
import { Brawler, Rubik, Geist, Inter } from "next/font/google";
import "./globals.css";

const brawler = Brawler({
  weight: ["400", "700"],
  variable: "--font-brawler",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arhant Solutions | Best Insurance Software in Nepal",
  description:
    "Arhant Solutions provides the best insurance management software in Nepal, serving B2B SaaS companies globally.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({
  variable: "--font-sans", // Body font
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        rubik.variable,
        inter.variable,
        brawler.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
            <Navbar />

            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
