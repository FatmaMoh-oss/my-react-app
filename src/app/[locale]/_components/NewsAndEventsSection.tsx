import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { NewsAndEventsGallery } from "./NewsAndEventsGallery";

const NewsAndEventsSection = async () => {
  const t = await getTranslations();

  return (
    <div className="w-full flex flex-col px-4 md:px-16 py-15 bg-[#F2ECEC]">
      <div className="flex flex-col md:flex-row mb-8 gap-4 md:gap-20">
        <div className="flex flex-col w-full">
          <p className="text-zinc-800 text-base font-normal mb-2">
            {t("newsAndEventsSection.stayConnected")}
          </p>
          <div className="flex flex-row flex-wrap gap-2 items-baseline">
            <h1 className="text-red-700 text-4xl font-bold">
              {t("newsAndEventsSection.stayUpdated")}
            </h1>
            <h1 className="text-red-950 text-4xl font-normal">
              {t("newsAndEventsSection.latestNewsAndEvents")}
            </h1>
          </div>
        </div>
        <div className="flex w-full h-auto justify-end items-end">
          <Link
            aria-disabled="true"
            tabIndex={-1}
            href="#" // TODO: Add the correct href
            className="inline-flex px-6 py-3 rounded-[5px] outline-[#E95A56] outline-2 text-[#E95A56] text-base font-bold hover:text-white hover:bg-[#E95A56] transition duration-200 items-center cursor-not-allowed opacity-50"
          >
            {t("newsAndEventsSection.viewAll")}
          </Link>
        </div>
      </div>
      <div>
        <NewsAndEventsGallery />
      </div>
    </div>
  );
};

export default NewsAndEventsSection;
