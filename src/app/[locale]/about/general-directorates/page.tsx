"use client";

import { useState, ReactElement } from "react";
import DirectorateTab from "../../_components/DirectorateTab";
import ServiceCentres from "../../_components/ServiceCentres";
import { useLocale, useTranslations } from "next-intl";

export interface ServiceItem {
  icon: ReactElement;
  text: string;
}

export interface TabConfig {
  key: string;
  name: string;
}

const SERVICES_ICONS = {
  monitor: { src: "/assets/common/monitor.svg", size: 22 },
  trend: { src: "/assets/common/trend.svg", size: 22 },
  globe: { src: "/assets/common/globe.svg", size: 23 },
  box: { src: "/assets/common/box.svg", size: 24 },
  shield: { src: "/assets/common/shield.svg", size: 26 },
  money: { src: "/assets/common/money.svg", size: 21 },
  gear: { src: "/assets/common/gear.svg", size: 24 },
  leaf: { src: "/assets/common/leaf.svg", size: 28 },
  paper: { src: "/assets/common/paper.svg", size: 21 },
  handshake: { src: "/assets/common/handshake.svg", size: 27 },
  ruler: { src: "/assets/common/ruler.svg", size: 24 },
  speaker: { src: "/assets/common/speaker.svg", size: 24 },
  prevention: { src: "/assets/common/prevention.svg", size: 22 },
  investmentHand: { src: "/assets/common/investmentHand.svg", size: 24 },
  bubbleIdea: { src: "/assets/common/bubbleIdea.svg", size: 24 },
  balance: { src: "/assets/common/balance.svg", size: 24 },
  magnifier: { src: "/assets/common/magnifier.svg", size: 22 },
} as const;

const tabImages = {
  commerce: "/assets/general-directorates/commerce.png",
  industry: "/assets/general-directorates/industry.svg",
  investmentPromotion: "/assets/general-directorates/investmentPromotion.svg",
  standards: "/assets/general-directorates/standards.svg",
  investmentServicesCenter:
    "/assets/general-directorates/investmentServicesCenter.svg",
  antiMonopoly: "/assets/general-directorates/antiMonopoly.svg",
} as const;

const GeneralDirectorates = () => {
  const locale = useLocale();
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("commerce");

  const tabsConfig: TabConfig[] = [
    { key: "pages.generalDirectorates.tab.commerce", name: "commerce" },
    { key: "pages.generalDirectorates.tab.industry", name: "industry" },
    {
      key: "pages.generalDirectorates.tab.investmentPromotion",
      name: "investmentPromotion",
    },
    { key: "pages.generalDirectorates.tab.standards", name: "standards" },
    {
      key: "pages.generalDirectorates.tab.investmentServicesCenter",
      name: "investmentServicesCenter",
    },
    { key: "pages.generalDirectorates.tab.antiMonopoly", name: "antiMonopoly" },
  ];

  // Create service item with icon
  const createServiceItem = (
    iconKey: keyof typeof SERVICES_ICONS,
    translationKey: string
  ): ServiceItem => ({
    icon: (
      <img
        src={SERVICES_ICONS[iconKey].src}
        alt="icon"
        width={SERVICES_ICONS[iconKey].size}
        height={SERVICES_ICONS[iconKey].size}
        className="text-[#BB1613]"
      />
    ),
    text: t(translationKey),
  });

  // Services configuration for each tab
  const servicesConfig = {
    commerce: [
      { icon: "monitor", key: "0" },
      { icon: "trend", key: "1" },
      { icon: "globe", key: "2" },
      { icon: "box", key: "3" },
      { icon: "shield", key: "4" },
      { icon: "money", key: "5" },
    ],
    industry: [
      { icon: "gear", key: "0" },
      { icon: "money", key: "1" },
      { icon: "globe", key: "2" },
      { icon: "shield", key: "3" },
      { icon: "leaf", key: "4" },
      { icon: "box", key: "5" },
    ],
    investmentPromotion: [
      { icon: "trend", key: "0" },
      { icon: "globe", key: "1" },
      { icon: "gear", key: "2" },
      { icon: "paper", key: "3" },
      { icon: "handshake", key: "4" },
      { icon: "monitor", key: "5" },
    ],
    standards: [
      { icon: "gear", key: "0" },
      { icon: "shield", key: "1" },
      { icon: "ruler", key: "2" },
      { icon: "box", key: "3" },
      { icon: "monitor", key: "4" },
      { icon: "paper", key: "5" },
    ],
    investmentServicesCenter: [
      { icon: "investmentHand", key: "0" },
      { icon: "paper", key: "1" },
      { icon: "bubbleIdea", key: "2" },
      { icon: "trend", key: "3" },
      { icon: "handshake", key: "4" },
      { icon: "monitor", key: "5" },
    ],
    antiMonopoly: [
      { icon: "balance", key: "0" },
      { icon: "prevention", key: "1" },
      { icon: "ruler", key: "2" },
      { icon: "magnifier", key: "3" },
      { icon: "speaker", key: "4" },
      { icon: "handshake", key: "5" },
    ],
  } as const;

  const tabs = locale === "ar" ? [...tabsConfig].reverse() : tabsConfig;

  // Generate services for active tab
  const getServicesForTab = (tabName: keyof typeof servicesConfig) =>
    servicesConfig[tabName].map(({ icon, key }) =>
      createServiceItem(
        icon as keyof typeof SERVICES_ICONS,
        `pages.generalDirectorates.${tabName}.services.${key}`
      )
    );

  return (
    <section className="w-full overflow-hidden mt-17 mb-[6rem]">
      <div className="w-full bg-[#F8F8F8] font-roboto">
        {/* Header Section */}
        <div className="py-12 relative">
          {/* Background images */}
          <div
            className="absolute inset-0 flex justify-between items-center w-full max-w-none lg:max-w-full lg:container pt-[5rem]"
            style={{ direction: "ltr" }}
          >
            <img
              src="/assets/common/about-page.svg"
              alt="icon"
              className="w-[265px] hidden lg:block"
              aria-hidden="true"
            />
            <img
              src="/assets/common/about-page.svg"
              alt="icon"
              className="w-[265px] hidden lg:block transform -scale-x-100"
              aria-hidden="true"
            />
          </div>

          {/* Title Section */}
          <div className="relative z-10 px-4 container mx-auto">
            <div className="text-center mx-auto max-w-[768px]">
              <p className="mb-4">
                {t("pages.generalDirectorates.ministryDirectorates")}
              </p>
              <h1 className="text-[36px] font-normal leading-[120%] text-[#340201]">
                <span className="text-[#BB1613] font-bold">
                  {t("pages.generalDirectorates.generalDirectorates")}:
                </span>{" "}
                {t("pages.generalDirectorates.drivingBusiness")}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="w-full">
          <div className="container flex justify-center mx-auto px-4">
            <nav
              className={`flex gap-4 ${
                locale === "ar" ? "flex-row-reverse" : ""
              } overflow-x-auto xl:overflow-x-visible overflow-y-hidden`}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.name)}
                  className={`relative px-4 py-2.5 text-base whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    activeTab === tab.name
                      ? "text-[#BB1613] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#BB1613]"
                      : "text-gray-700"
                  }`}
                >
                  {t(tab.key)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto pt-[2rem] pb-[3rem] min-w-[89vw]">
          {Object.keys(servicesConfig).map(
            (tabName) =>
              activeTab === tabName && (
                <DirectorateTab
                  key={tabName}
                  isActive={true}
                  title={t(`pages.generalDirectorates.${tabName}.title`)}
                  subtitle={t(`pages.generalDirectorates.${tabName}.subtitle`)}
                  image={tabImages[tabName as keyof typeof tabImages]}
                  services={getServicesForTab(
                    tabName as keyof typeof servicesConfig
                  )}
                />
              )
          )}
        </div>
      </div>
      <ServiceCentres />
    </section>
  );
};

export default GeneralDirectorates;
