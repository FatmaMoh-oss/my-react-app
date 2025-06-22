import React from "react";
import InvestHero from "../_components/InvestHero";
import InvestmentSectors from "../_components/InvestmentSectors";
import InvestTabs from "../_components/InvestTabs";
import InvestorGuideSection from "../_components/InvestorGuideSection";

const InvestPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <InvestHero />
      <InvestTabs />
      <InvestmentSectors />
      <InvestorGuideSection />
    </main>
  );
};

export default InvestPage;
