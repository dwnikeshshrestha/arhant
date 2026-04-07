import type { Metadata } from "next";
import { Brawler, Rubik, Geist } from "next/font/google";
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
  description: "Arhant Solutions provides the best insurance management software in Nepal, serving B2B SaaS companies globally.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", rubik.variable, brawler.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
