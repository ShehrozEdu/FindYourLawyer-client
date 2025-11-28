import React from "react";
import HeroSection from "./HeroSection";
import ValueProposition from "./ValueProposition";
import FeaturesShowcase from "./FeaturesShowcase";
import HowItWorks from "./HowItWorks";
import BenefitsSection from "./BenefitsSection";
import DashboardPreview from "./DashboardPreview";
import TrustSection from "./TrustSection";
import CTASection from "./CTASection";
import Footer from "../../Home/Footer";

function LawFirmLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <ValueProposition />
      <FeaturesShowcase />
      <HowItWorks />
      <BenefitsSection />
      <DashboardPreview />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default LawFirmLanding;

