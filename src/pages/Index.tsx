import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import PricingSection from "@/components/sections/PricingSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { AccessibilityMenu } from "@/a11y";
import TranslateIcon from "@/components/TranslateIcon";
import ConditionalA11yIcon from "@/components/ConditionalA11yIcon";
import PWAButton from "@/components/PWAButton";
import ConditionalExport from "@/components/ConditionalExport";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main id="main-content" role="main">
        <div data-section="hero">
          <HeroSection />
        </div>
        <div data-section="problem">
          <ProblemSection />
        </div>
        <div data-section="solution">
          <SolutionSection />
        </div>
        <section id="benefits" data-section="benefits">
          <BenefitsSection />
        </section>
        <div data-section="pricing">
          <PricingSection />
        </div>
        <div data-section="cta">
          <CtaSection />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <TranslateIcon />
      <ConditionalA11yIcon />
      <PWAButton />
      <ConditionalExport />
    </div>
  );
};

export default Index;
