import type { Metadata } from "next";
import { Brawler, Mona_Sans } from "next/font/google";
import "./globals.css";

const brawler = Brawler({
  weight: ["400", "700"],
  variable: "--font-brawler",
  subsets: ["latin"],
});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        monaSans.variable,
        brawler.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main
            className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-white"
          >
            <Navbar />

            <div className="flex-1 pt-20 md:pt-24 lg:pt-[112px]">
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
