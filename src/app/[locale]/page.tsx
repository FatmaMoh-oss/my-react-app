import React from "react";
import HeroSection from "./_components/HeroSection";
import OurServicesSection from "./_components/OurServicesSection";
import InvestorGuidePopup from "../../components/InvestorGuidePopup/InvestorGuidePopup";
import InvestorGuideSection from "./_components/InvestorGuideSection";
import WhyOmanSection from "./_components/WhyOmanSection";
import PartnersSection from "./_components/PartnersSection";
import NewsAndEventsSection from "./_components/NewsAndEventsSection";
import AdBannerSection from "./_components/AdBannerSection";

const LandingPage = async () => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <HeroSection />
      <InvestorGuidePopup />
      <OurServicesSection />
      <InvestorGuideSection />
      <WhyOmanSection />
      <AdBannerSection />
      <PartnersSection />
      <NewsAndEventsSection />
    </main>
  );
};

export default LandingPage;
