import { BlogSection } from "@/components/blocks/BlogSection";
import { ClientsSection } from "@/components/blocks/ClientsSection";
import { FaqSection } from "@/components/blocks/FaqSection";
import { HeroSection } from "@/components/blocks/HeroSection";
import { OurWorkSection } from "@/components/blocks/OurWorkSection";
import { PartnersSection } from "@/components/blocks/PartnersSection";
import { ProductsSection } from "@/components/blocks/ProductsSection";
import { SolutionsSection } from "@/components/blocks/SolutionsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* <Navbar /> */}
      <HeroSection />
      <ClientsSection />
      <ProductsSection />
      <SolutionsSection />
      {/* <AboutSection /> */}
      <OurWorkSection />
      <PartnersSection />
      <BlogSection />
      <FaqSection />
      {/* <Footer /> */}
    </main>
  );
}
