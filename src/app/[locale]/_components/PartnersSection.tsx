import { getClientMediaUrl } from "@/api/clientAxios";
import { getPartners } from "@/services/getPartners";
import { getLocale, getTranslations } from "next-intl/server";
import Marquee from "react-fast-marquee";

const PartnersSection = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const partners = await getPartners();

  if (!partners) return null;

  return (
    <div className="flex flex-col md:flex-row md:px-16 py-15 items-center w-full bg-[#F8F8F8]">
      <p className="text-red-950 text-2xl font-bold text-start md:w-[20%] mb-8 md:mb-0">
        {t("partnersSection.ourTrustedPartners")}
      </p>
      <div dir="ltr" className="w-screen overflow-hidden">
        {/* The Marquee component doesent work correctly in rtl mode, so always force ltr in its parent div */}
        <Marquee
          play={true}
          speed={70}
          direction={locale === "en" ? "right" : "left"}
          className="md:relative fixed left-0 right-0 w-screen z-10"
        >
          <div className="flex gap-12">
            {partners.concat(partners).map((partner, index) => (
              <span
                key={index}
                className="flex items-center justify-center p-4 transition-all"
              >
                {partner.url ? (
                  <a href={partner.url} target="_blank" rel="noreferrer">
                    <img
                      src={getClientMediaUrl(partner.logo.url)}
                      alt={partner.entity}
                      className="h-[100px] max-w-[150px] object-contain grayscale hover:grayscale-0 transition duration-200 select-none"
                      draggable={false}
                    />
                  </a>
                ) : (
                  <img
                    src={getClientMediaUrl(partner.logo.url)}
                    alt={partner.entity}
                    className="h-[100px] max-w-[150px] object-contain grayscale hover:grayscale-0 transition duration-200 select-none"
                    draggable={false}
                  />
                )}
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default PartnersSection;
