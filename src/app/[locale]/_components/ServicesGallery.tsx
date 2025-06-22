"use client";

import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@relume_io/relume-ui";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import clsx from "clsx";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ScrollButton from "@/components/ScrollButton/ScrollButton";
import type { CarouselApi } from "@relume_io/relume-ui";
import { useLocale } from "next-intl";

export interface ImageProps {
  backgroundImageSrc: string;
  logoSrc?: string;
  title: string;
  description: string;
  url: string;
}

export interface ServicesGalleryProps
  extends React.ComponentPropsWithoutRef<"section"> {
  images: ImageProps[];
  exploreText: string;
}

const ServicesGallery: React.FC<ServicesGalleryProps> = ({
  images,
  exploreText,
}) => {
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize carousel and get scroll snap positions
  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList()); // get the actual pages

    // Set current page on load
    setCurrent(api.selectedScrollSnap());

    // Update current page on select event
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleCardClick = (index: number, url: string) => {
    if (isMobile) {
      if (activeCard === index) {
        window.open(url, "_blank");
      } else {
        setActiveCard(index);
      }
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: false,
        align: "start",
        direction: locale === "ar" ? "rtl" : "ltr",
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="basis-full pl-0 pr-6 md:basis-1/2 md:pr-8 h-91 w-85 hover:cursor-pointer"
          >
            {/* ... card content ... */}
            <div
              className="relative aspect-square size-full group"
              onClick={() => handleCardClick(index, image.url)}
            >
              <img
                src={image.backgroundImageSrc}
                title={image.title}
                className="size-full object-cover select-none pointer-events-none"
              />
              {/* Grey Overlay */}
              <div
                className={clsx(
                  "absolute inset-0 bg-black transition-all duration-300",
                  {
                    "opacity-0 group-hover:opacity-30": !isMobile,
                    "opacity-0": isMobile && activeCard !== index,
                    "opacity-80 pointer-events-auto":
                      isMobile && activeCard === index,
                  }
                )}
              ></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

              {/* Pink Banner SVG */}
              <div
                className={clsx(
                  "absolute top-4 h-24 w-full transition-all duration-300",
                  {
                    "group-hover:opacity-0": !isMobile,
                    "opacity-0": isMobile && activeCard === index,
                    "opacity-80": isMobile && activeCard !== index,
                  }
                )}
              >
                <img
                  src="/assets/services/pink-services-banner.svg"
                  title="Banner"
                  className="object-contain opacity-80 select-none pointer-events-none rtl:-scale-x-100 w-full"
                />
              </div>

              {/* Service Title & Logo */}
              <div
                className={`flex flex-col items-left absolute ${
                  image.logoSrc ? "top-12" : "top-[4.3rem]"
                } w-full px-3 z-10`}
              >
                {image.logoSrc && (
                  <img
                    src={image.logoSrc}
                    title={image.title}
                    className="h-7 w-7 pb-1 select-none pointer-events-none"
                  />
                )}
                <span className="text-stone-50 text-xl font-bold">
                  {image.title}
                </span>
              </div>

              {/* Service Description */}
              <div
                className={clsx(
                  "absolute inset-0 flex flex-col items-center bg-zinc-800 transition-all duration-300",
                  {
                    "opacity-0 group-hover:opacity-80": !isMobile,
                    "opacity-0 pointer-events-none":
                      isMobile && activeCard !== index,
                    "opacity-80 pointer-events-auto":
                      isMobile && activeCard === index,
                  }
                )}
              >
                <div className="absolute top-[28%] w-[90%]">
                  <img
                    src="/assets/services/service-hover-state-vertical-line.svg"
                    title="Line"
                    className="object-contain select-none pointer-events-none w-3 mt-1 h-12 mb-2"
                  />
                  <p className="text-stone-50 text-sm font-normal mb-5">
                    {image.description}
                  </p>
                  <div className="flex flex-row gap-2">
                    <p className="text-white text-Text-alternate text-sm font-bold">
                      {exploreText}
                    </p>
                    {locale === "en" ? (
                      <FaArrowRightLong className="text-white w-5 h-5" />
                    ) : (
                      <FaArrowLeftLong className="text-white w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-0 end-0 w-8 h-8 bg-[#E07373] flex items-center justify-center shadow-md text-white group-hover:opacity-0 transition-all duration-300">
                {locale === "en" ? (
                  <BsChevronRight className="w-6 h-6" />
                ) : (
                  <BsChevronLeft className="w-6 h-6" />
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Pagination and Scroll Buttons */}
      <div className="rt-8 mt-8 flex items-center justify-between">
        <div className="flex w-full items-start justify-start">
          {/* Map over scrollSnaps (pages) instead of images */}
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={clsx(
                "mx-[3px] inline-block size-2 rounded-full hover:cursor-pointer",
                {
                  "bg-red-700": current === index,
                  "bg-stone-200": current !== index,
                }
              )}
            />
          ))}
        </div>
        <div className="flex items-end justify-end gap-2 md:gap-4">
          {/* Scroll Buttons */}
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
              <ScrollButton
                direction="prev"
                onClick={() => api?.scrollPrev()}
                canScroll={Boolean(api?.canScrollPrev())}
              />
              <ScrollButton
                direction="next"
                onClick={() => api?.scrollNext()}
                canScroll={Boolean(api?.canScrollNext())}
              />
            </>
          )}
        </div>
      </div>
    </Carousel>
  );
};

export default ServicesGallery;
