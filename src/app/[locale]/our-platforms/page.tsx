import PlatformsCards from "../_components/PlatformsCards";
import ServicesGuide from "../_components/ServicesGuide";
import ServiceDetailsCard from "../_components/ServiceDetailsCard";
import { useTranslations, useLocale } from "next-intl";
import clsx from "clsx";
import { BiSearch } from "react-icons/bi";

const OurPlatformsPage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <main className="w-full overflow-hidden mt-20">
      <div className="w-full font-roboto">
        {/* Header Section */}
        <div className="pt-12 pb-3 relative">
          {/* Background images */}
          <div className="absolute inset-0 flex justify-end items-center w-full max-w-none lg:max-w-full lg:container top-[9rem]">
            <img
              src="/assets/common/logoLong.svg"
              alt="icon"
              className="w-[] hidden lg:block rtl:-scale-x-100"
              aria-hidden="true"
            />
          </div>

          {/* Title Section */}
          <div className="relative z-10 container px-[3.5%] mt-0">
            <h2 className="text-[#BB1613] font-bold text-[2.25rem] mb-4">
              {t("pages.ourPlatforms.title")}
            </h2>
            <p className="text-gray-700 mb-6 max-w-3xl text-[1rem]">
              {t("pages.ourPlatforms.description")}
            </p>
          </div>
        </div>
      </div>

      <section className="relative z-10 px-4 md:px-16 py-16 pt-0">
        <PlatformsCards />
      </section>

      <section className="">
        <ServicesGuide />
      </section>

      <div className="mt-[5rem] w-full font-roboto">
        {/* Header Section */}
        <div className="relative">
          {/* Background images */}
          <div className="absolute inset-0 flex justify-end items-center w-full max-w-none lg:max-w-full lg:container">
            <img
              src="/assets/common/logoLong.svg"
              alt="icon"
              className="w-[] hidden lg:block rtl:-scale-x-100"
              aria-hidden="true"
            />
          </div>

          {/* Title Section */}
          <section className="relative z-10 container px-[3.5%] mt-0">
            <h6 className="text-gray-700 max-w-3xl text-[1rem] mb-1">
              {t("pages.ourPlatforms.servicesDirectory.title")}
            </h6>
            <h4 className="text-[#BB1613] font-bold text-[2.25rem] mb-1">
              {t("pages.ourPlatforms.servicesDirectory.question")}
            </h4>
            <p className="text-gray-700 mb-6 max-w-3xl text-[1rem]">
              {t("pages.ourPlatforms.servicesDirectory.description")}
            </p>
            <div className="relative w-full md:w-[42.3333%] mb-17">
              <input
                type="text"
                placeholder={t("common.search")}
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
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
          </section>
        </div>
        <ServiceDetailsCard />
      </div>
    </main>
  );
};

export default OurPlatformsPage;
