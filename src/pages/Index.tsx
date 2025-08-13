import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import PricingSection from "@/components/sections/PricingSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { AccessibilityMenu } from "@/a11y";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main id="main-content" role="main">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <section id="benefits">
          <BenefitsSection />
        </section>
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <AccessibilityMenu />
    </div>
  );
};

export default Index;
