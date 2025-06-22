"use client";

import { useState, useEffect } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import clsx from "clsx";
import { useTranslations, useLocale } from "next-intl";
import { ImageProps } from "../_components/ServicesGallery";

const PlatformsCards = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const cards: ImageProps[] = [
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
      backgroundImageSrc: "/assets/services/Hazm.svg",
      logoSrc: "/assets/services/logos/Hazm.svg",
      title: t("ourServicesSection.hazmPlatform"),
      description: t("ourServicesSection.hazmPlatformDescription"),
      url: "https://hazm.gov.om",
    },
    {
      backgroundImageSrc: "/assets/platforms/investorEstablishedPlatform.png",
      logoSrc: "/assets/platforms/investorEstablishedPlatform.svg",
      title: t("pages.ourPlatforms.investorEstablishedPlatform.title"),
      description: t(
        "pages.ourPlatforms.investorEstablishedPlatform.description"
      ),
      url: "#",
    },
    {
      backgroundImageSrc: "/assets/platforms/MaaroufOmanPlatform.png",
      logoSrc: "/assets/platforms/MaaroufOmanPlatform.svg",
      title: t("ourServicesSection.maroofOman"),
      description: t("ourServicesSection.maroofOmanDescription"),
      url: "https://maroof.om",
    },
    {
      backgroundImageSrc: "/assets/platforms/omanExportsPlatform.png",
      logoSrc: "/assets/platforms/omanExportsPlatform.svg",
      title: t("ourServicesSection.omanExportsPlatform"),
      description: t("ourServicesSection.omanExportsPlatformDescription"),
      url: "https://exports.om",
    },
    // {
    //   backgroundImageSrc: "/assets/platforms/sanadCenters.png",
    //   logoSrc: "/assets/platforms/sanadCentersLogo.png",
    //   title: t("pages.ourPlatforms.sanadCenters.title"),
    //   description: t("pages.ourPlatforms.sanadCenters.description"),
    //   url: "#",
    // },
  ];

  const filteredCards =
    searchTerm.trim() === ""
      ? cards
      : cards.filter(
          (card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (index: number, url?: string) => {
    if (isMobile) {
      if (activeCard === index) {
        if (url) {
          window.open(url, "_blank");
        }
      } else {
        setActiveCard(index);
      }
    } else {
      if (url) {
        window.open(url, "_blank");
      }
    }
  };

  return (
    <div className={`w-full ${isRTL ? "rtl" : "ltr"}`}>
      {/* Search Container */}
      <div className="relative w-full md:w-[42.3333%] mb-17">
        <input
          type="text"
          placeholder={t("common.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={clsx(
            "border border-gray-300 rounded-sm py-2 w-full bg-white",
            isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
          )}
        />
        <BiSearch
          className={clsx(
            "absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5",
            isRTL ? "right-3" : "left-3"
          )}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className="relative aspect-square w-full group cursor-pointer overflow-hidden"
            onClick={() => handleCardClick(index, card.url)}
          >
            {/* Background Image */}
            <img
              src={card.backgroundImageSrc}
              alt={card.title}
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Overlay */}
            <div
              className={clsx(
                "absolute inset-0 bg-black transition-all duration-300",
                {
                  "opacity-0 group-hover:opacity-30": !isMobile,
                  "opacity-0": isMobile && activeCard !== index,
                  "opacity-80 pointer-events-auto":
                    isMobile && activeCard === index,
                }
              )}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

            {/* Pink Banner */}
            <div
              className={clsx(
                "absolute top-5 left-0 right-0 h-24 transition-all duration-300",
                {
                  "group-hover:opacity-0": !isMobile,
                  "opacity-0": isMobile && activeCard === index,
                  "opacity-80": isMobile && activeCard !== index,
                }
              )}
            >
              <img
                src="/assets/services/pink-services-banner.svg"
                alt="Banner"
                className={`w-full h-full object-cover opacity-80 select-none pointer-events-none ${
                  isRTL ? "-scale-x-100" : ""
                }`}
              />
            </div>

            {/* Title and Logo */}
            <div
              className={`absolute top-7 ${
                isRTL ? "right-0" : "left-0"
              } w-full p-4 z-10`}
            >
              <div className="flex flex-col gap-1">
                {card.logoSrc && (
                  <img
                    src={card.logoSrc}
                    title={card.title}
                    className="h-7 w-7 object-contain select-none pointer-events-none"
                  />
                )}
                <h3 className="text-stone-50 text-lg md:text-xl font-bold line-clamp-2">
                  {card.title}
                </h3>
              </div>
            </div>

            {/* Hover Content */}
            <div
              className={clsx(
                "absolute inset-0 flex flex-col bg-zinc-800 transition-all duration-300 p-4",
                {
                  "opacity-0 group-hover:opacity-80": !isMobile,
                  "opacity-0 pointer-events-none":
                    isMobile && activeCard !== index,
                  "opacity-80 pointer-events-auto":
                    isMobile && activeCard === index,
                }
              )}
            >
              <div className="relative h-[64%] flex flex-col top-[35%]">
                <img
                  src="/assets/services/service-hover-state-vertical-line.svg"
                  alt="Line"
                  className="w-3 h-12 object-contain select-none pointer-events-none mb-4"
                />
                <p className="text-stone-50 text-sm font-normal mb-4 line-clamp-4">
                  {card.description}
                </p>
                <div
                  className={`mt-auto flex items-center gap-2 justify-start`}
                >
                  <span className="text-white text-sm font-bold whitespace-nowrap">
                    {t("common.exploreMore")}
                  </span>
                  {isRTL ? (
                    <FaArrowLeftLong className="text-white w-4 h-4 flex-shrink-0" />
                  ) : (
                    <FaArrowRightLong className="text-white w-4 h-4 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>

            {/* Arrow Button */}
            <div
              className={`absolute bottom-0 ${
                isRTL ? "left-0" : "right-0"
              } w-8 h-8 bg-[#E07373] flex items-center justify-center shadow-md text-white group-hover:opacity-0 transition-all duration-300`}
            >
              {isRTL ? (
                <BsChevronLeft className="w-5 h-5" />
              ) : (
                <BsChevronRight className="w-5 h-5" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformsCards;
