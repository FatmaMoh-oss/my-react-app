"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { useServicesGuide } from "@/hooks";
import { getClientMediaUrl } from "@/api/clientAxios";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

const ServicesGuide = () => {
  const t = useTranslations();
  const { servicesGuide, isLoading, error } = useServicesGuide();

  if (isLoading || error || !servicesGuide) return null;

  return (
    <div className="relative w-full min-h-[300px] md:h-62 bg-[url('/assets/images/investorGuide.svg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" />{" "}
      {/* Optional overlay for better text readability */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-20 p-6 md:px-16 md:py-12">
        {/* Left section */}
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="text-white text-base font-normal">
            {t("pages.ourPlatforms.servicesGuide.title")}
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            {t("pages.ourPlatforms.servicesGuide.subTitle")}
          </h1>
          <h2 className="text-white text-xl md:text-3xl font-normal">
            {t("pages.ourPlatforms.servicesGuide.question")}
          </h2>
        </div>

        {/* Right section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-white text-base font-normal max-w-[90%] md:max-w-[65%]">
            {t("pages.ourPlatforms.servicesGuide.description")}
          </p>
          <div className="flex">
            <PrimaryButton
              buttonText={t("pages.ourPlatforms.servicesGuide.downloadGuide")}
              onClickAction={() =>
                window.open(getClientMediaUrl(servicesGuide.url), "_blank")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesGuide;
