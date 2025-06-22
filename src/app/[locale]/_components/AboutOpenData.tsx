"use client";
import { useTranslations, useLocale } from "next-intl";

export default function DataSection() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="w-full">
      {/* Open Data */}

      <section className="bg-gray-50 mt-15 md:mt-18 h-[17rem]">
        <div className="absolute w-full flex justify-between items-start px-4 pt-8 w-full max-w-none lg:max-w-full lg:container">
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
        <div className="flex flex-col p-[2rem] lg:p-[1rem] mx-auto max-w-4xl text-center">
          <h1 className="my-5 text-gray-700">
            {t("pages.data.shortdescription")}
          </h1>
          <h2 className="text-3xl font-bold">
            <span className="text-red-700">{t("pages.data.title1")}</span>
            <span className="text-gray-700">{t("pages.data.title2")}</span>
          </h2>

          <p className="my-5 text-gray-700">{t("pages.data.description")}</p>
        </div>
      </section>
    </div>
  );
}
