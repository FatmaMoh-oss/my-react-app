"use client";
import { useTranslations } from "next-intl";
import React from "react";

const ExploreOpportunitiesButton = () => {
  const t = useTranslations();

  return (
    <button
      className="rounded-[5px] bg-[#e95a56] outline-2 outline-transparent px-6 py-3 text-white text-base font-bold hover:cursor-pointer hover:text-[#e95a56] hover:outline-[#e95a56] hover:bg-white transition duration-200"
      onClick={() =>
        window.open("https://investoman.om/opportunity-explorer", "_blank")
      }
    >
      {t("heroSection.exploreOpportunities")}
    </button>
  );
};

export default ExploreOpportunitiesButton;
