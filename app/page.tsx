import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageBackground } from "@/components/layout/PageBackground";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProductShowcaseSection } from "@/components/sections/ProductShowcaseSection";
import { TypographyShowcaseSection } from "@/components/sections/TypographyShowcaseSection";

export default function Home() {
  return (
    <>
      <PageBackground />
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ProductShowcaseSection />
        <TypographyShowcaseSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
