"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import React from "react";
import { CiGlobe } from "react-icons/ci";

const LocaleSwitcher = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    router.refresh();
  };

  return (
    <div className={`${isMobile ? "w-full text-center" : ""}`}>
      <div
        className={`flex items-center gap-2 py-3 text-md lg:py-2 lg:text-base ${
          isMobile ? "justify-center" : ""
        }`}
      >
        <CiGlobe className="w-6 h-6" />
        <button
          onClick={() => toggleLocale("en")}
          className={`hover:text-[#df7272] hover:underline decoration-[2px] underline-offset-4 transition duration-300 hover:cursor-pointer ${
            locale === "en" ? "text-[#df7272]" : "text-white"
          }`}
        >
          EN
        </button>
        <span className="text-[#c68b8b]">|</span>
        <button
          onClick={() => toggleLocale("ar")}
          className={`hover:text-[#df7272] hover:underline decoration-[2px] underline-offset-4 transition duration-300 hover:cursor-pointer ${
            locale === "ar" ? "text-[#df7272]" : "text-white"
          }`}
        >
          العربية
        </button>
      </div>
    </div>
  );
};

export default LocaleSwitcher;
