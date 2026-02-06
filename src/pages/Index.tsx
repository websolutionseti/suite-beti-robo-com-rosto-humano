import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import PricingSection from "@/components/sections/PricingSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingMenu from "@/components/FloatingMenu";
import PWAButton from "@/components/PWAButton";
import ConditionalExport from "@/components/ConditionalExport";
import ExitIntentModal from "@/components/ExitIntentModal";

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
      <FloatingMenu />
      <PWAButton />
      <ConditionalExport />
      <ExitIntentModal />
    </div>
  );
};

export default Index;
