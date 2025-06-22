"use client";

import { useTranslations } from "next-intl";
import ServicesGallery, { ImageProps } from "./ServicesGallery";

const InvestmentSectors = () => {
  const t = useTranslations();

  const images: ImageProps[] = [
    {
      backgroundImageSrc: "/assets/investment-sectors/petrochemical.png",
      title: t("pages.invest.investmentSectors.petrochemical.title"),
      description: t(
        "pages.invest.investmentSectors.petrochemical.description"
      ),
      url: "#",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/manufacturing.png",
      title: t("pages.invest.investmentSectors.manufacturing.title"),
      description: t(
        "pages.invest.investmentSectors.manufacturing.description"
      ),
      url: "https://investoman.om/manufacturing",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/fisheries.png",
      title: t("pages.invest.investmentSectors.fisheries.title"),
      description: t("pages.invest.investmentSectors.fisheries.description"),
      url: "https://investoman.om/fisheries",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/renewable-energy.png",
      title: t("pages.invest.investmentSectors.renewableEnergy.title"),
      description: t(
        "pages.invest.investmentSectors.renewableEnergy.description"
      ),
      url: "https://investoman.om/renewable-energy",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/agriculture.png",
      title: t("pages.invest.investmentSectors.agriculture.title"),
      description: t("pages.invest.investmentSectors.agriculture.description"),
      url: "https://investoman.om/agriculture",
    },

    {
      backgroundImageSrc: "/assets/investment-sectors/circularEconomy.svg",
      title: t("pages.invest.investmentSectors.circularEconomy.title"),
      description: t(
        "pages.invest.investmentSectors.circularEconomy.description"
      ),
      url: "https://investoman.om/circular-economy",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/mining.svg",
      title: t("pages.invest.investmentSectors.mining.title"),
      description: t("pages.invest.investmentSectors.mining.description"),
      url: "https://investoman.om/ar_002/mining",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/healthCare.svg",
      title: t("pages.invest.investmentSectors.healthcare.title"),
      description: t("pages.invest.investmentSectors.healthcare.description"),
      url: "https://investoman.om/healthcare",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/tourism.svg",
      title: t("pages.invest.investmentSectors.tourism.title"),
      description: t("pages.invest.investmentSectors.tourism.description"),
      url: "https://investoman.om/ar_002/tourism",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/ICT.svg",
      title: t("pages.invest.investmentSectors.itc.title"),
      description: t("pages.invest.investmentSectors.itc.description"),
      url: "https://investoman.om/ict",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/education.svg",
      title: t("pages.invest.investmentSectors.education.title"),
      description: t("pages.invest.investmentSectors.education.description"),
      url: "https://investoman.om/education",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/logistics.svg",
      title: t("pages.invest.investmentSectors.logistics.title"),
      description: t("pages.invest.investmentSectors.logistics.description"),
      url: "https://investoman.om/logistics",
    },
    {
      backgroundImageSrc: "/assets/investment-sectors/startups.svg",
      title: t("pages.invest.investmentSectors.startUps.title"),
      description: t("pages.invest.investmentSectors.startUps.description"),
      url: "https://investoman.om/sector/startups-88",
    },
  ];

  return (
    <section id="relume" className="relative w-full overflow-hidden">
      <div className="my-[5rem] relative">
        {/* Background images container */}
        <div className="absolute inset-0 flex justify-between items-center w-full max-w-none lg:max-w-full lg:container">
          <img
            src="/assets/common/about-page.svg"
            alt=""
            className="w-[265px] hidden lg:block"
            aria-hidden="true"
          />
          <img
            src="/assets/common/about-page.svg"
            alt=""
            className="w-[265px] rotate-180 hidden lg:block"
            aria-hidden="true"
          />
        </div>

        <div className="w-[90%] mx-auto mt-15">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mb-2">{t("common.exploreOpportunities")}</p>
            <h2 className="text-3xl text-[#4a2c2c] mb-5 font-semibold">
              {t("pages.invest.investmentSectors.title")}
            </h2>
          </div>
        </div>
      </div>
      <section className="relative w-full overflow-hidden px-[5%] py-2 mb-13">
        <div className="container">
          <ServicesGallery
            images={images}
            exploreText={t("common.exploreOpportunities")}
          />
        </div>
      </section>
    </section>
  );
};

export default InvestmentSectors;
