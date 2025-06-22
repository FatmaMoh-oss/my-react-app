"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import InternationalOfficesPopup from "./InternationalOfficesPopup";

export interface CardInfo {
  title: string;
  description: string;
  phone: string[];
  email: string[];
  mapLink: string;
  imageSrc: string;
}

export interface ServiceCardType {
  imageUrl: string;
  imageAlt: string;
  titleKey: string;
  descriptionKey?: string;
  offices?: string[];
  isVertical?: boolean;
}

const ServiceCard: React.FC<ServiceCardType> = ({
  imageUrl,
  imageAlt,
  titleKey,
  descriptionKey,
  offices,
  isVertical = false,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const [openCard, setOpenCard] = useState<CardInfo | undefined>(undefined);
  const isArabic = locale === "ar";

  const isDisabled = true;

  // Define office-specific data
  const officeDetails: { [key: string]: CardInfo } = {
    "pages.generalDirectorates.serviceCentres.internationalOffices.offices.uae":
      {
        title: t(
          "pages.generalDirectorates.serviceCentres.internationalOffices.uae.title"
        ),
        description: t(
          "pages.generalDirectorates.serviceCentres.internationalOffices.uae.description"
        ),
        phone: ["009713977688", "009713971000"],
        email: ["aziza@ocodubai.com", "abbas@ocodubai.com"],
        mapLink: "https://maps.app.goo.gl/C6aZEdChgjauCtYV8?g_st=iw",
        imageSrc: "/assets/offices/DubaiOffice.svg",
      },
    "pages.generalDirectorates.serviceCentres.internationalOffices.offices.qatar":
      {
        title: t(
          "pages.generalDirectorates.serviceCentres.internationalOffices.qatar.title"
        ),
        description: t(
          "pages.generalDirectorates.serviceCentres.internationalOffices.qatar.description"
        ),
        phone: ["44374069(+974)"],
        email: ["cro@tejarah.gov.om"],
        mapLink:
          "https://maps.app.goo.gl/MmxQ5ieMTAikoYzx5?g_st=com.google.maps.preview.copy",
        imageSrc: "/assets/offices/DohaOffice.svg",
      },
    "pages.generalDirectorates.serviceCentres.internationalOffices.offices.switzerland":
      {
        title: t(
          "pages.generalDirectorates.serviceCentres.internationalOffices.switzerland.title"
        ),
        description: t(
          "pages.generalDirectorates.serviceCentres.internationalOffices.switzerland.description"
        ),
        phone: ["+4122 758 03 85", "+4122 758 05 73"],
        email: ["wto@omanmission.ch"],
        mapLink: "https://maps.app.goo.gl/bgUcL7jeUbYdtELJA",
        imageSrc: "/assets/offices/GenevaOffice.svg",
      },
  };

  const cardContent = (
    <div className={`p-7 flex-grow ${isArabic ? "text-right" : "text-left"}`}>
      <h3
        className={`text-xl text-[#4a2c2c] mb-2.5 ${
          isVertical && !isArabic ? "max-w-[68%]" : "max-w-full"
        }`}
      >
        {t(titleKey)}
      </h3>
      {descriptionKey && (
        <p className="text-sm text-gray-700 mb-2.5">{t(descriptionKey)}</p>
      )}
      {offices ? (
        <ul className="list-none p-0">
          {offices.map((office, index) => (
            <li key={index} className="mb-2">
              <a
                onClick={() => setOpenCard(officeDetails[office])}
                className="text-[#BB1613] font-bold hover:text-[#900000] hover:underline hover:cursor-pointer"
              >
                {t(office)}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <a
          className={`inline-block font-bold ${
            isDisabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#BB1613] hover:text-[#900000] hover:underline hover:cursor-pointer"
          }`}
          onClick={(e) => {
            if (isDisabled) e.preventDefault(); // Prevent default behavior if disabled
          }}
          aria-disabled={isDisabled} // Accessibility attribute
        >
          {t("common.exploreServices")} {isArabic ? "←" : "→"}
        </a>
      )}
    </div>
  );

  return (
    <>
      <div
        className={`bg-white border border-[#D4D8D7] overflow-hidden ${
          isVertical ? "flex flex-col h-full" : "flex flex-col md:flex-row"
        }`}
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`
          ${isVertical ? "w-full max-h-123" : "w-full md:w-[47%]"}
          object-cover
          ${!isVertical && "flex-shrink-0"}
          ${!isVertical && isArabic ? "order-1" : ""}
        `}
        />
        {cardContent}
      </div>
      {openCard && (
        <InternationalOfficesPopup
          cardInfo={openCard}
          setOpenCard={setOpenCard}
        />
      )}
    </>
  );
};

export default ServiceCard;
