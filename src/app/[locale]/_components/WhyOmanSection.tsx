import { getStatistics } from "@/services/getStatistics";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const WhyOmanSection = async () => {
  const t = await getTranslations();
  const statistics = await getStatistics();

  return (
    <div className="w-full h-auto py-15 px-4 md:px-16">
      <div className="flex flex-col md:flex-row gap-4 md:gap-20 mb-8">
        <div className="w-full h-auto md:w-[50%]">
          <p className="mb-2 text-zinc-800 text-base font-normal">
            {t("whyOmanSection.whyOman")}
          </p>
          <h1 className="text-red-700 text-4xl font-bold">
            {t("whyOmanSection.whyInvestInOman")}
          </h1>
          <h1 className="text-red-950 text-4xl font-normal">
            {t("whyOmanSection.unlockEndlessOpportunities")}
          </h1>
        </div>
        <div className="w-full h-auto md:w-[50%]">
          <p className="w-full md:w-[70%] text-red-950 text-base font-normal mb-2">
            {t("whyOmanSection.omanInvestmentAdvantages")}
          </p>
          <Link
            aria-disabled="true"
            tabIndex={-1}
            href="#" // TODO: Replace with correct link to success stories
            className="inline-flex px-6 py-3 rounded-[5px] outline-[#E95A56] outline-2 text-[#E95A56] text-base font-bold hover:text-white hover:bg-[#E95A56] transition duration-200 items-center cursor-not-allowed opacity-50"
          >
            {t("whyOmanSection.exploreSuccessStories")}
          </Link>
        </div>
      </div>
      <div className="w-full h-auto md:h-200 flex flex-col md:flex-row gap-8">
        {/* TODO: Get all content for the stats from the CMS*/}
        <div className="flex flex-col gap-3 justify-center items-center text-center h-65 md:h-full w-full bg-[url('/assets/images/StatsCards1.png')] bg-cover bg-center">
          {statistics && statistics.length > 0 && (
            <>
              <p className="text-gray-200 text-6xl font-semibold font-['Jost']">
                {statistics[0].statistic}
              </p>
              <p className="text-stone-50 text-base font-medium w-[80%]">
                {statistics[0].description}
              </p>
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="h-65 md:h-full bg-[url('/assets/images/StatsCards2.png')] bg-cover bg-center hidden md:block"></div>
          <div className="flex flex-col gap-3 justify-center items-center text-center h-65 md:h-full bg-[url('/assets/images/StatsCards3.png')] bg-cover bg-center">
            {statistics && statistics.length > 1 && (
              <>
                <p className="text-gray-200 text-6xl font-semibold font-['Jost']">
                  {statistics[1].statistic}
                </p>
                <p className="text-stone-50 text-base font-medium w-[80%]">
                  {statistics[1].description}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-3 justify-center items-center text-center h-65 md:h-full bg-[url('/assets/images/StatsCards4.png')] bg-cover bg-center">
            {statistics && statistics.length > 2 && (
              <>
                <p className="text-gray-200 text-6xl font-semibold font-['Jost']">
                  {statistics[2].statistic}
                </p>
                <p className="text-stone-50 text-base font-medium w-[80%]">
                  {statistics[2].description}
                </p>
              </>
            )}
          </div>
          <div className="h-65 md:h-full bg-[url('/assets/images/StatsCards5.png')] bg-cover bg-center hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

export default WhyOmanSection;
