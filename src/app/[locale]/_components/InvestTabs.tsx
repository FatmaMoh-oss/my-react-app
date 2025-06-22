import React from "react";
import InvestSteps from "../_components/InvestSteps";
import { useTranslations } from "next-intl";

const InvestTabs = () => {
  const t = useTranslations();

  const tabKeys = [
    {
      tabKey: "registerCompanyJourneySteps",
      stepCount: 6,
      url: "https://investoman.om/ar_002/opportunity-explorer#opportunities-map",
    },
    {
      tabKey: "logisticsSectorJourney",
      stepCount: 4,
      url: "https://investoman.om/opportunity-explorer/logistics-28",
    },
    {
      tabKey: "industrialSectorJourney",
      stepCount: 8,
      url: "https://investoman.om/opportunity-explorer/manufacturing-2",
    },
    {
      tabKey: "fisheriesSectorJourney",
      stepCount: 4,
      url: "https://investoman.om/opportunity-explorer/fisheries-30",
    },
    {
      tabKey: "miningSectorJourney",
      stepCount: 8,
      url: "https://investoman.om/opportunity-explorer/mining-31",
    },
    {
      tabKey: "agricultureSectorJourney",
      stepCount: 7,
      url: "https://investoman.om/opportunity-explorer/agriculture-33",
    },
    {
      tabKey: "educationSectorJourney",
      stepCount: 5,
      url: "https://investoman.om/opportunity-explorer/education-35",
    },
    {
      tabKey: "ict",
      stepCount: 4,
      url: "https://investoman.om/opportunity-explorer/ict-36",
    },
    {
      tabKey: "healthcarePrivateJourney",
      stepCount: 7,
      url: "https://investoman.om/opportunity-explorer/healthcare-37",
    },
    {
      tabKey: "healthcareSupplyJourney",
      stepCount: 8,
      url: "https://investoman.om/opportunity-explorer/ministry-of-health-60",
    },
    {
      tabKey: "tourismHotelsJourney",
      stepCount: 7,
      url: "https://investoman.om/opportunity-explorer/tourism-38",
    },
    {
      tabKey: "tourismComplexesJourney",
      stepCount: 5,
      url: "https://investoman.om/opportunity-explorer/tourism-38",
    },
    { tabKey: "aviationSectorJourney", stepCount: 3, url: "#" },
    {
      tabKey: "telecommunicationSectorJourney",
      stepCount: 4,
      url: "https://investoman.om/opportunity-explorer/ministry-of-transport-communication-and-information-technology-48",
    },
  ];

  const investTabs = tabKeys.map(({ tabKey, stepCount, url }, index) => ({
    title: t(`pages.invest.tabs.${index}`),
    steps: Array.from({ length: stepCount }, (_, stepIndex) =>
      t(`pages.invest.${tabKey}.${stepIndex}`)
    ),
    url: url,
  }));

  return <InvestSteps tabs={investTabs} />;
};

export default InvestTabs;
