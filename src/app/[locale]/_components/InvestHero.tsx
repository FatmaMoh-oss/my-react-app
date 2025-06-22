"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

export default function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();

  const textDirection = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 bg-red-50 mt-15 md:mt-18">
        <div
          className={`flex flex-col justify-center p-[2rem] lg:p-[4rem] text-${textDirection}`}
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {t("pages.invest.title")}
          </h1>
          <p className="my-5 text-gray-700">{t("pages.invest.description")}</p>
          <a
            href="https://investoman.om/opportunity-explorer#opportunities-map"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start"
          >
            <PrimaryButton
              buttonText={t("common.exploreOpportunities")}
              onClickAction={() => console.log("Click")}
              width="fit"
            />
          </a>
        </div>
        <div className="relative w-full h-64 md:h-[30rem]">
          <Image
            src="/assets/images/invest-hero.png"
            alt="Oman City"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>
    </div>
  );
}
