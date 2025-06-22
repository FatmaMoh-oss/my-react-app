import { getClientMediaUrl } from "@/api/clientAxios";
import { getAdBannerData } from "@/services/getAdBannerData";
import Link from "next/link";
import React from "react";

const AdBannerSection = async () => {
  const adBannerData = await getAdBannerData();

  if (!adBannerData) {
    return null;
  }

  return (
    <div className="relative w-full h-[45rem] md:h-[28rem] 2xl:h-[36rem] overflow-hidden">
      {/* Mobile Banner */}
      <div className="absolute inset-0 w-full h-full z-2 md:hidden">
        <img
          src="/assets/common/AdSectionBannerMobile.svg"
          className="w-full h-full object-cover select-none pointer-events-none rtl:-scale-x-100"
          alt=""
        />
      </div>

      {/* Desktop Banner */}
      <div className="absolute inset-0 w-full h-full z-2 hidden md:block">
        <img
          src="/assets/common/AdSectionBanner.png"
          className="w-full h-full object-cover select-none pointer-events-none rtl:-scale-x-100"
          alt=""
        />
      </div>

      {/* Content Image */}
      <div className="absolute bottom-0 ltr:right-0 rtl:left-0 h-full w-full md:w-[52%] z-1">
        {/* For mobile screens (<768px), we want the inner div to have specific positioning */}
        <div className="relative h-full md:static">
          {/* This wrapper controls the image height and position on mobile */}
          <div className="md:h-full h-[58%] absolute top-[42%] md:relative md:top-0 w-full">
            <img
              className="h-full w-full object-cover select-none pointer-events-none"
              src={getClientMediaUrl(adBannerData.imageUrl)}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="relative z-3 py-15 px-4 md:px-16 md:w-[45%]">
        <h1 className="text-stone-50 text-4xl font-bold mb-4">
          {adBannerData.title}
        </h1>
        <p className="text-stone-50 text-base font-normal mb-6">
          {adBannerData.description}
        </p>
        {adBannerData.buttonUrl && (
          <Link
            href={adBannerData.buttonUrl}
            className="px-6 py-3 rounded-[5px] outline-2 outline-stone-50 inline-flex justify-center items-center gap-2 text-stone-50 text-base font-bold hover:cursor-pointer hover:text-[#e95a56] hover:outline-[#e95a56] hover:bg-white transition duration-200"
          >
            {adBannerData.buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdBannerSection;
