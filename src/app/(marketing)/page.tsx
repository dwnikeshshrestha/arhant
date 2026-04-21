import { AboutSection } from "@/components/blocks/AboutSection";
import { BlogSection } from "@/components/blocks/BlogSection";
import { ClientsSection } from "@/components/blocks/ClientsSection";
import { FaqSection } from "@/components/blocks/FaqSection";
import GeneralClientsSection from "@/components/blocks/GeneralClientsSection";
import { HeroSection } from "@/components/blocks/HeroSection";
import { InsuranceClientsSection } from "@/components/blocks/InsuranceClientsSection";
import LifeInsuranceClientSection from "@/components/blocks/LifeInsuranceClientSection";
import { OurWorkSection } from "@/components/blocks/OurWorkSection";
import { ProductsSection } from "@/components/blocks/ProductsSection";
import { SolutionsSection } from "@/components/blocks/SolutionsSection";
import TechnologyPartnerSection from "@/components/blocks/TechnologyPartnerSection";
import ContainerLayout from "@/components/layout/ContainerLayout";
import { HeroParallax } from "@/components/ui/hero-parallax";
 const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },
 
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
 
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
 
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <HeroParallax products={products} />
      <ClientsSection />
      {/* <ProductsSection /> */}
      <SolutionsSection />
      {/* <AboutSection /> */}
      <OurWorkSection />
      <GeneralClientsSection />
      <LifeInsuranceClientSection />
      <TechnologyPartnerSection/>
      <BlogSection />
      <FaqSection />
      {/* <Footer /> */}
    </>
  );
}
