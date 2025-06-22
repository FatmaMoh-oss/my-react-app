import { useTranslations } from "next-intl";
import ServiceCard from "./ServiceCard";

export const SERVICE_CARDS = {
  investOmanHall: {
    imageUrl: "/assets/general-directorates/invest-oman-hall.png",
    imageAlt: "Competition Protection",
    titleKey: "pages.generalDirectorates.serviceCentres.investOmanHall.title",
    descriptionKey:
      "pages.generalDirectorates.serviceCentres.investOmanHall.description",
    isVertical: true,
  },
  sanadOffices: {
    imageUrl: "/assets/general-directorates/sanad-offices.png",
    imageAlt: "Sanad Offices",
    titleKey: "pages.generalDirectorates.serviceCentres.sanadOffices.title",
    descriptionKey:
      "pages.generalDirectorates.serviceCentres.sanadOffices.description",
  },
  omanExports: {
    imageUrl: "/assets/general-directorates/oman-exports.png",
    imageAlt: "Oman Exports",
    titleKey: "pages.generalDirectorates.serviceCentres.omanExports.title",
    descriptionKey:
      "pages.generalDirectorates.serviceCentres.omanExports.description",
  },
  internationalOffices: {
    imageUrl: "/assets/general-directorates/international-offices.png",
    imageAlt: "International Offices",
    titleKey:
      "pages.generalDirectorates.serviceCentres.internationalOffices.title",
    offices: [
      "pages.generalDirectorates.serviceCentres.internationalOffices.offices.uae",
      "pages.generalDirectorates.serviceCentres.internationalOffices.offices.qatar",
      "pages.generalDirectorates.serviceCentres.internationalOffices.offices.switzerland",
    ],
  },
};

const ServiceCentres = () => {
  const t = useTranslations();
  const { investOmanHall, ...horizontalCards } = SERVICE_CARDS;

  return (
    <div className="w-[90%] mx-auto mt-15">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="mb-2">
          {t("pages.generalDirectorates.serviceCentres.aboutUs")}
        </p>
        <h2 className="text-3xl text-[#4a2c2c] mb-5 font-semibold">
          {t("pages.generalDirectorates.serviceCentres.ourServiceCentres")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Vertical Card */}
        <ServiceCard {...investOmanHall} />

        {/* Right/Left Column based on language */}
        <div className="flex flex-col gap-5">
          {/* Horizontal Cards */}
          {Object.values(horizontalCards).map((card, index) => (
            <ServiceCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCentres;
