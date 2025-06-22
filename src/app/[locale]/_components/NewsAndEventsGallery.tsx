"use client";

import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@relume_io/relume-ui";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { CarouselApi } from "@relume_io/relume-ui";
import clsx from "clsx";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { FaRegCalendar } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { formatLocalizedDate } from "@/utils/utils";
import { getClientMediaUrl } from "@/api/clientAxios";
import { useNewsAndEvents } from "@/hooks/useNewsAndEvents";

export const NewsAndEventsGallery = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { newsAndEvents, loading, error } = useNewsAndEvents();

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (loading || error) return null;

  return (
    <section
      id="relume"
      className="relative w-full overflow-hidden px-[5%] py-2"
    >
      <div className="container">
        {/* for all available options: https://www.embla-carousel.com/api/options/ */}
        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
            align: "start",
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
        >
          <CarouselContent>
            {newsAndEvents.map((newsAndEvent, index) => (
              <CarouselItem
                key={index}
                className="basis-full h-120 mb-4 pl-0 pr-6 md:basis-1/2 md:pr-8 w-90 max-w-90 md:w-115 md:max-w-115"
              >
                <div className="relative aspect-square size-full group">
                  <img
                    src={getClientMediaUrl(newsAndEvent.thumbnailUrl)}
                    title={newsAndEvent.title}
                    className="h-69 w-full object-cover select-none pointer-events-none mb-6"
                  />

                  <div
                    className={clsx("flex flex-row gap-4 mb-2 absolute top-5", {
                      "right-4": locale === "en",
                      "left-4": locale === "ar",
                    })}
                  >
                    {newsAndEvent.tags
                      .filter((tag) => tag && tag.trim() !== "")
                      .map((tag, index) => (
                        <div
                          key={index}
                          className="px-2 py-1 bg-stone-50 rounded-sm outline-1 outline-offset-[-1px] outline-red-400 inline-flex justify-start items-start text-red-500 text-sm font-semibold"
                        >
                          {tag}
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-row gap-4 mb-2">
                    {newsAndEvent.date && (
                      <div className="flex flex-row items-center gap-2">
                        <FaRegCalendar className="w-5 h-5 text-[#E95A56]" />
                        <p className="text-zinc-900 text-sm font-normal">
                          {formatLocalizedDate(newsAndEvent.date, locale)}
                        </p>
                      </div>
                    )}
                    {newsAndEvent.location && (
                      <div className="flex flex-row items-center gap-2">
                        <SlLocationPin className="w-5 h-5 text-[#E95A56]" />
                        <p className="text-zinc-900 text-sm font-normal">
                          {newsAndEvent.location}
                        </p>
                      </div>
                    )}
                  </div>
                  <h1 className="text-red-950 text-2xl font-bold line-clamp-1 mb-2">
                    {newsAndEvent.title}
                  </h1>
                  <p className="text-red-950 text-base font-normal line-clamp-2 mb-4">
                    {newsAndEvent.content}
                  </p>
                  <div
                    key={newsAndEvent.id}
                    className="inline-flex flex-row gap-2 items-center w-auto cursor-not-allowed"
                    // Disabled until news and events page is ready, and added cursor-not-allowed instead of hover:cursor-pointer
                    // onClick={() =>
                    //   (window.location.href = `/media/news_and_events/${newsAndEvent.id}`)
                    // }
                  >
                    <p className="text-zinc-800 text-base font-normal hover:text-[#E95A56] transition duration-200">
                      {t("newsAndEventsSection.readMore")}
                    </p>
                    {locale === "ar" ? (
                      <FaChevronLeft className="w-4 h-4 text-[#E95A56]" />
                    ) : (
                      <FaChevronRight className="w-4 h-4 text-[#E95A56]" />
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="rt-8 mt-0 flex items-center justify-between">
            <div className="flex w-full items-start justify-start">
              {newsAndEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={clsx(
                    "mx-[3px] inline-block size-2 rounded-full hover:cursor-pointer",
                    {
                      "bg-red-700": current === index + 1,
                      "bg-stone-200": current !== index + 1,
                    }
                  )}
                />
              ))}
            </div>
            <div className="flex items-end justify-end gap-2 md:gap-4">
              {locale === "ar" ? (
                <>
                  <button
                    onClick={() => api?.scrollPrev()}
                    disabled={!api?.canScrollPrev()}
                    className={clsx(
                      "transition-colors duration-300 rounded-full border-2 w-10 h-10 flex items-center justify-center",
                      {
                        "text-[#E95A56] border-[#E95A56] hover:cursor-pointer hover:bg-[#f8e2e1]":
                          api?.canScrollPrev(),
                        "text-[#677677] border-[#677677] hover:cursor-not-allowed":
                          !api?.canScrollPrev(),
                      }
                    )}
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => api?.scrollNext()}
                    disabled={!api?.canScrollNext()}
                    className={clsx(
                      "transition-colors duration-300 rounded-full border-2 w-10 h-10 flex items-center justify-center",
                      {
                        "text-[#E95A56] border-[#E95A56] hover:cursor-pointer hover:bg-[#f8e2e1]":
                          api?.canScrollNext(),
                        "text-[#677677] border-[#677677] hover:cursor-not-allowed":
                          !api?.canScrollNext(),
                      }
                    )}
                  >
                    <FaArrowLeft className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => api?.scrollPrev()}
                    disabled={!api?.canScrollPrev()}
                    className={clsx(
                      "transition-colors duration-300 rounded-full border-2 w-10 h-10 flex items-center justify-center",
                      {
                        "text-[#E95A56] border-[#E95A56] hover:cursor-pointer hover:bg-[#f8e2e1]":
                          api?.canScrollPrev(),
                        "text-[#677677] border-[#677677] hover:cursor-not-allowed":
                          !api?.canScrollPrev(),
                      }
                    )}
                  >
                    <FaArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => api?.scrollNext()}
                    disabled={!api?.canScrollNext()}
                    className={clsx(
                      "transition-colors duration-300 rounded-full border-2 w-10 h-10 flex items-center justify-center",
                      {
                        "text-[#E95A56] border-[#E95A56] hover:cursor-pointer hover:bg-[#f8e2e1]":
                          api?.canScrollNext(),
                        "text-[#677677] border-[#677677] hover:cursor-not-allowed":
                          !api?.canScrollNext(),
                      }
                    )}
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
