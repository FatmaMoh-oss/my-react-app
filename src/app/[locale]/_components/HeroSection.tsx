"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import ExploreOpportunitiesButton from "./ExploreOpportunitiesButton";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useHeroSection } from "@/hooks/useHeroSection";
import { getClientMediaUrl } from "@/api/clientAxios";
import Loading from "@/components/Loading/Loading";

const HeroSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [hasLoaded, setHasLoaded] = useState(false);
  const { heroSectionItems, isLoading, error } = useHeroSection();

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  // Function to handle left/right navigation
  const handleNavigation = (dir: "prev" | "next") => {
    setDirection(dir === "next" ? "right" : "left");

    setCurrentIndex((prevIndex) => {
      if (dir === "next") {
        return prevIndex === heroSectionItems.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? heroSectionItems.length - 1 : prevIndex - 1;
      }
    });
  };

  // **Optimized Animation Variants**
  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 1,
      willChange: "transform, opacity",
    }),
    center: { x: 0, opacity: 1, willChange: "transform, opacity" },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 1,
      willChange: "transform, opacity",
    }),
  };

  if (isLoading) {
    return (
      <section className="w-full h-156 flex flex-col md:flex-row bg-[#FFF1EF] mt-15 md:mt-18">
        <Loading />;
      </section>
    );
  }

  if (error || heroSectionItems.length === 0) {
    return null;
  }

  return (
    <section className="w-full h-156 flex flex-col md:flex-row bg-[#FFF1EF] mt-15 md:mt-18">
      {/* Left Section with Text */}
      <div className="w-full md:w-[45%] h-full flex flex-col">
        <div className="w-full h-full px-4 py-15 md:px-16 md:py-31">
          <h1 className="text-[#bb1613] text-4xl font-bold">
            {t("heroSection.investInOman")}
          </h1>
          <h1 className="text-[#340201] text-4xl font-normal mb-4">
            {t("heroSection.yourFutureAwaits")}
          </h1>
          <p className="text-[#340201] text-base font-normal mb-4">
            {t("heroSection.heroDescription")}
          </p>
          <ExploreOpportunitiesButton />
        </div>

        {/* Chevron Navigation Bar & Sliding Title + Description */}
        <div className="w-full h-34 bg-[#340201] text-white flex flex-row relative overflow-hidden">
          <div
            className="w-18 h-full flex flex-row items-center justify-center hover:cursor-pointer z-40 bg-[#340201]"
            onClick={() =>
              locale == "ar"
                ? handleNavigation("prev")
                : handleNavigation("next")
            }
          >
            {locale === "en" ? (
              <BsChevronLeft className="w-6 h-6" />
            ) : (
              <BsChevronRight className="w-6 h-6" />
            )}
          </div>

          {/* Title & Description Animation */}
          <div className="relative flex-1 flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="sync">
              <motion.div
                key={currentIndex}
                className="absolute w-full"
                variants={hasLoaded ? slideVariants : undefined}
                custom={direction}
                initial={hasLoaded ? "enter" : "center"}
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="text-[#f8f8f8] text-base">
                  {heroSectionItems[currentIndex].title}
                </p>
                <p className="opacity-80 text-[#f8f8f8] text-sm overflow-hidden text-ellipsis break-words line-clamp-2">
                  {heroSectionItems[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="w-18 h-full flex flex-row items-center justify-center hover:cursor-pointer z-40 bg-[#340201] "
            onClick={() =>
              locale == "ar"
                ? handleNavigation("next")
                : handleNavigation("prev")
            }
          >
            {locale === "en" ? (
              <BsChevronRight className="w-6 h-6" />
            ) : (
              <BsChevronLeft className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>

      {/* Media Display */}
      <div className="w-full h-94 md:h-full overflow-hidden relative">
        <AnimatePresence custom={direction} mode="sync">
          {heroSectionItems.map((heroSectionItem, index) =>
            index === currentIndex ? (
              <motion.div
                key={index}
                className="absolute w-full h-full"
                variants={hasLoaded ? slideVariants : undefined}
                custom={direction}
                initial={hasLoaded ? "enter" : "center"}
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {heroSectionItem.mediaType === "video" ? (
                  <video
                    className="w-full h-full object-cover"
                    src={getClientMediaUrl(heroSectionItem.url)}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={getClientMediaUrl(heroSectionItem.url)}
                  />
                )}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
