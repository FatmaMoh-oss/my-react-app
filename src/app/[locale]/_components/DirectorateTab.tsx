import { ReactElement } from "react";
import { useTranslations, useLocale } from "next-intl";

interface DirectorateTabProps {
  isActive: boolean;
  title: string;
  subtitle: string;
  image: string;
  services: Array<{ icon: ReactElement; text: string }>;
}

const DirectorateTab = ({
  isActive,
  title,
  subtitle,
  image,
  services,
}: DirectorateTabProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`w-full transition-all duration-500 ${
        isActive
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full hidden"
      }`}
    >
      <div className="flex flex-col lg:flex-row w-[90%] min-h-[420px] bg-white rounded w-full my-2.5 border border-[#D4D8D7]">
        <div className="flex-1 p-5 md:p-10 flex flex-col justify-center items-start">
          <p className="text-sm text-gray-600 mb-2.5">{subtitle}</p>
          <h1 className="text-2xl text-[#3d1c1c] mb-4">{title}</h1>
          <div className="text-base mb-2.5">
            {t("pages.generalDirectorates.whatWeDo")}:
          </div>
          <ul className="list-none p-0 mb-[1rem]">
            {services.map((service, index) => (
              <li key={index} className="mb-2 flex items-center">
                {service.icon}
                <p className={isArabic ? "mr-[1rem]" : "ml-[1rem]"}>
                  {service.text}
                </p>
              </li>
            ))}
          </ul>
          <button className="mt-1.5 bg-[#E95A56] border-2 border-[#E95A56] text-white px-2.5 py-2.5 text-sm rounded font-semibold hover:bg-white hover:text-[#E95A56] transition-colors duration-300 cursor-pointer">
            {t("common.exploreServices")}
          </button>
        </div>
        <div className="flex-1 h-[300px] lg:h-auto">
          <img
            src={image}
            alt="Content"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DirectorateTab;
