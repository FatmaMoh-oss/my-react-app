"use client";

import React from "react";
import useOpenData from "@/hooks/useOpenData";
import { useTranslations } from "next-intl";
import { getOpenDataUrl } from "@/api/clientAxios";

const OpenDataList = () => {
  const { openData, isLoading, error } = useOpenData();
  const t = useTranslations();

  if (isLoading) return <p className="text-center">{t("common.loading")}</p>;
  if (error)
    return <p className="text-center text-red-600">{t("common.error")}</p>;
  if (openData.length === 0)
    return <p className="text-center">{t("pages.data.nofiles")}</p>;

  return (
    <section className="bg-white min-h-screen pt-8 pb-20">
      <ul className="space-y-4 px-4">
        {openData.map(({ fileName, description, fileUrl }, index) => {
          if (!fileUrl) return null;

          const fullUrl = getOpenDataUrl(fileUrl);
          console.log("Document URL:", fullUrl);

          return (
            <li key={fileUrl + index} className="flex justify-center">
              <div className="p-4 bg-white rounded shadow-md border border-gray-200 w-full max-w-screen-xl">
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-700 flex items-center font-medium hover:underline"
                  title={fileName || "Unnamed File"}
                >
                  <img
                    src="/assets/common/Icon.svg"
                    alt="file icon"
                    className="inline w-5 h-5 mr-2"
                    aria-hidden="true"
                  />
                  {fileName || "Unnamed File"}
                </a>

                {description && (
                  <p className="text-gray-700 mt-2">{description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-end items-center w-full max-w-none lg:max-w-full lg:container px-4 mt-12">
        <img
          src="/assets/common/logoLong.svg"
          alt="Logo"
          className="hidden lg:block rtl:-scale-x-100"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

export default OpenDataList;
