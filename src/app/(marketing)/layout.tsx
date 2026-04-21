import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex-1 pt-20 md:pt-24 lg:pt-[112px]">
        {children}
      </div>
      <Footer />
    </>
  );
}
