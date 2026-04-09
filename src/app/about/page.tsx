import { AboutSection } from "@/components/blocks/AboutSection";
import OurValues from "@/components/blocks/OurValues";
import TrustedClients from "@/components/blocks/TrustedClients";
import ContainerLayout from "@/components/layout/ContainerLayout";
import React from "react";

function page() {
  return (
    <ContainerLayout className="space-y-6">
      <AboutSection />
      
      <OurValues />
      {/* <TrustedClients /> */}
    </ContainerLayout>
  );
}

export default page;
