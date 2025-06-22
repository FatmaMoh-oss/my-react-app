import { getTranslations } from "next-intl/server";
import React from "react";
import ServicesGallery, { ImageProps } from "./ServicesGallery";

const OurServicesSection = async () => {
  const t = await getTranslations();

  const images: ImageProps[] = [
    {
      backgroundImageSrc: "/assets/services/OmanBusinessForum.png",
      logoSrc: "/assets/services/logos/OmanBusinessForum.svg",
      title: t("ourServicesSection.omanBusinessForum"),
      description: t("ourServicesSection.omanBusinessForumDescription"),
      url: "https://obf.om",
    },
    {
      backgroundImageSrc: "/assets/services/InvestOman.png",
      logoSrc: "/assets/services/logos/InvestOman.svg",
      title: t("ourServicesSection.investInOman"),
      description: t("ourServicesSection.investInOmanDescription"),
      url: "https://investoman.om/",
    },
    {
      backgroundImageSrc: "/assets/services/MadeInOman.png",
      logoSrc: "/assets/services/logos/MadeInOman.svg",
      title: t("ourServicesSection.madeInOman"),
      description: t("ourServicesSection.madeInOmanDescription"),
      url: "https://madeinoman.gov.om/",
    },
    {
      backgroundImageSrc: "/assets/services/OmanBusinessPlatform.png",
      logoSrc: "/assets/services/logos/OmanBusinessPlatform.svg",
      title: t("ourServicesSection.omanBusinessPlatform"),
      description: t("ourServicesSection.omanBusinessPlatformDescription"),
      url: "https://www.business.gov.om",
    },
    {
      backgroundImageSrc: "/assets/services/OmanExportsPlatform.png",
      logoSrc: "/assets/services/logos/OmanExportsPlatform.svg",
      title: t("ourServicesSection.omanExportsPlatform"),
      description: t("ourServicesSection.omanExportsPlatformDescription"),
      url: "https://exports.om",
    },
    {
      backgroundImageSrc: "/assets/services/OmanResidence.svg",
      logoSrc: "/assets/services/logos/OmanResidence.svg", // TODO: Find correct logo (if it exists)
      title: t("ourServicesSection.investorResidence"),
      description: t("ourServicesSection.investorResidenceDescription"),
      url: "https://omanresidence.gov.om",
    },
    {
      backgroundImageSrc: "/assets/services/Sanad.svg",
      logoSrc: "/assets/services/logos/Sanad.svg",
      title: t("ourServicesSection.sanadServicesCenters"),
      description: t("ourServicesSection.sanadServicesCentersDescription"),
      url: "https://www.sanad.om",
    },
    {
      backgroundImageSrc: "/assets/services/Maroof.svg",
      logoSrc: "/assets/services/logos/Maroof.svg",
      title: t("ourServicesSection.maroofOman"),
      description: t("ourServicesSection.maroofOmanDescription"),
      url: "https://maroof.om",
    },
    {
      backgroundImageSrc: "/assets/services/Hazm.svg",
      logoSrc: "/assets/services/logos/Hazm.svg",
      title: t("ourServicesSection.hazmPlatform"),
      description: t("ourServicesSection.hazmPlatformDescription"),
      url: "https://hazm.gov.om",
    },
  ];

  return (
    <section className="w-full flex flex-col px-4 md:px-16 py-15">
      <div className="flex flex-col">
        <p className="text-[#2d2c2c] text-base mb-2">
          {t("ourServicesSection.ourServices")}
        </p>

        <div className="flex flex-col md:flex-row justify-between py-4 gap-4 md:gap-20">
          <div className="w-full md:w-[50%] flex flex-col">
            <h1 className="text-4xl font-bold text-[#bb1613]">
              {t("ourServicesSection.explore")}
            </h1>
            <h1 className="text-[#340201] text-4xl font-normal block">
              {t("ourServicesSection.ourLeadingServicePlatforms")}
            </h1>
          </div>
          <div className="w-full md:w-[50%] flex items-end text-[#340201] text-base font-normal">
            <p>{t("ourServicesSection.ourServicesDescription")}</p>
          </div>
        </div>
        <div>
          <section className="relative w-full overflow-hidden px-[5%] py-2">
            <div className="container">
              <ServicesGallery
                images={images}
                exploreText={t("ourServicesSection.exploreServices")}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
