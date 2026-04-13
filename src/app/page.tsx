import { AboutSection } from "@/components/blocks/AboutSection";
import { BlogSection } from "@/components/blocks/BlogSection";
import { ClientsSection } from "@/components/blocks/ClientsSection";
import { FaqSection } from "@/components/blocks/FaqSection";
import { HeroSection } from "@/components/blocks/HeroSection";
import { InsuranceClientsSection } from "@/components/blocks/InsuranceClientsSection";
import { OurWorkSection } from "@/components/blocks/OurWorkSection";
import { ProductsSection } from "@/components/blocks/ProductsSection";
import { SolutionsSection } from "@/components/blocks/SolutionsSection";
import ContainerLayout from "@/components/layout/ContainerLayout";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <ClientsSection />
      {/* <ProductsSection /> */}
      <SolutionsSection />
      {/* <AboutSection /> */}
      <OurWorkSection />
      <InsuranceClientsSection />
      <BlogSection />
      <FaqSection />
      {/* <Footer /> */}

    </>
  );
}
