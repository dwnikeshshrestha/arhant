import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/blocks/HeroSection";
import { AboutSection } from "@/components/blocks/AboutSection";
import { ClientsSection } from "@/components/blocks/ClientsSection";
import { SolutionsSection } from "@/components/blocks/SolutionsSection";
import { OurWorkSection } from "@/components/blocks/OurWorkSection";
import { ProductsSection } from "@/components/blocks/ProductsSection";
import { PartnersSection } from "@/components/blocks/PartnersSection";
import { BlogSection } from "@/components/blocks/BlogSection";
import { FaqSection } from "@/components/blocks/FaqSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <ProductsSection />
      <SolutionsSection />
      <AboutSection />
      <OurWorkSection />
      <PartnersSection />
      <BlogSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
