import { getClientMediaUrl } from "@/api/clientAxios";
import { getInvestorGuide } from "@/services/getInvestorGuide";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const InvestorGuideSection = async () => {
  const t = await getTranslations();

  const investorGuide = await getInvestorGuide();

  if (!investorGuide) {
    return null;
  }

  return (
    <div
      className="w-full h-auto md:h-62 flex flex-col md:flex-row items-center gap-4 md:gap-20 px-4 md:px-16
                 bg-[url('/assets/images/InvestorGuideBackground.jpg')] bg-cover bg-center"
    >
      <div className="w-full md:w-[50%] py-6  h-full flex flex-col justify-center">
        <p className="text-white text-base font-normal mb-2">
          {t("investorGuideSection.startYourInvestmentJourney")}
        </p>
        <h1 className="text-white text-3xl font-bold">
          {t("investorGuideSection.investorsGuide")}
        </h1>
        <h1 className="text-white text-3xl font-normal">
          {t("investorGuideSection.yourRoadmapToSuccess")}
        </h1>
      </div>
      <div className="w-full md:w-[50%] pb-14 md:pb-0 h-full flex flex-col md:justify-center">
        <p className="text-white text-base font-normal mb-6 w-[80%] md:w-[65%]">
          {t("investorGuideSection.investmentGuideDescription")}
        </p>
        <div className="w-auto">
          <Link
            href={getClientMediaUrl(investorGuide.url)}
            className="inline-flex rounded-[5px] bg-[#e95a56] outline-2 outline-transparent px-6 py-3 text-white text-base font-bold hover:cursor-pointer hover:text-[#e95a56] hover:outline-[#e95a56] hover:bg-white transition duration-200 items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("investorGuideSection.downloadInvestorGuide")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestorGuideSection;
