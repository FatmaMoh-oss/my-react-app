"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import ScrollButton from "@/components/ScrollButton/ScrollButton";

export interface TabData {
  title: string;
  steps: string[];
  url: string;
}

interface InvestStepsProps {
  tabs: TabData[];
}

const InvestSteps: React.FC<InvestStepsProps> = ({ tabs }) => {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [activeTab, setActiveTab] = useState(0);
  const [shouldCenter, setShouldCenter] = useState(true);

  // Note: In RTL, we reverse the scroll button conditions.
  const canScrollPrev = isArabic ? activeTab < tabs.length - 1 : activeTab > 0;
  const canScrollNext = isArabic ? activeTab > 0 : activeTab < tabs.length - 1;

  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if tabs should be centered (i.e. no scrolling needed)
  useEffect(() => {
    const checkIfShouldCenter = () => {
      const container = containerRef.current;
      const tabsContainer = tabsRef.current;
      if (container && tabsContainer) {
        const containerWidth = container.offsetWidth;
        const tabsWidth = tabsContainer.scrollWidth;
        setShouldCenter(tabsWidth <= containerWidth);
      }
    };

    checkIfShouldCenter();
    window.addEventListener("resize", checkIfShouldCenter);
    return () => window.removeEventListener("resize", checkIfShouldCenter);
  }, []);

  // Using scrollIntoView with inline "center" helps in both LTR and RTL.
  const scrollToTab = (index: number) => {
    const tabsContainer = tabsRef.current;
    if (!tabsContainer || !tabsContainer.children[index]) return;

    const tabElement = tabsContainer.children[index] as HTMLElement;
    // If scrolling is needed, use scrollIntoView to center the selected tab.
    if (!shouldCenter) {
      tabElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    setActiveTab(index);
  };

  return (
    <div className="w-full">
      <section className="px-6 py-20 bg-white">
        <div className="relative flex items-center">
          {/* Left Scroll Button */}
          {!shouldCenter && (
            <div className="absolute left-0 z-10 h-full flex items-center bg-gradient-to-r from-white to-transparent pr-4">
              <ScrollButton
                direction="prev"
                onClick={() =>
                  isArabic
                    ? scrollToTab(Math.min(tabs.length - 1, activeTab + 1))
                    : scrollToTab(Math.max(0, activeTab - 1))
                }
                canScroll={canScrollPrev}
              />
            </div>
          )}

          <div
            ref={containerRef}
            className="w-full mx-12 overflow-hidden"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div
              ref={tabsRef}
              className={`flex ${
                shouldCenter ? "justify-center" : "justify-start"
              } space-x-4 scroll-smooth px-4`}
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`cursor-pointer flex-shrink-0 px-4 py-2 whitespace-nowrap border-b-2 transition-all hover:border-red-500 hover:text-red-500 ${
                    activeTab === index
                      ? "border-red-500 text-red-500"
                      : "border-transparent"
                  }`}
                  onClick={() => scrollToTab(index)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          {!shouldCenter && (
            <div className="absolute right-0 z-10 h-full flex items-center bg-gradient-to-l from-white to-transparent pl-4">
              <ScrollButton
                direction="next"
                onClick={() =>
                  isArabic
                    ? scrollToTab(Math.max(0, activeTab - 1))
                    : scrollToTab(Math.min(tabs.length - 1, activeTab + 1))
                }
                canScroll={canScrollNext}
              />
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <div>
            {tabs[activeTab]?.steps.length > 0 ? (
              <>
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between xl:px-13 my-10">
                  <div className="w-full lg:w-auto">
                    <p className="mb-2">
                      {t("pages.invest.investmentJourney")}
                    </p>
                    <h2 className="text-2xl text-[#4a2c2c] mb-5">
                      {tabs[activeTab].title}
                    </h2>
                  </div>
                  <PrimaryButton
                    buttonText={t("common.exploreOpportunities")}
                    onClickAction={() =>
                      window.open(tabs[activeTab].url, "_blank")
                    }
                    width="fit"
                    className="mt-4 lg:mt-0 lg:ml-4 self-start"
                  />
                </div>
                <ol
                  className={`xl:px-[2rem] list-none justify-between xl:mx-[3rem] p-0 overflow-hidden relative 
                    [--default-b:lightgrey] [--default-c:black] [--active-b:purple] [--active-c:white] [--circle:3.5em] [--b:3px]
                    [background:linear-gradient(var(--default-b)_0_0)_no-repeat_50%_calc((var(--circle)_-_var(--b))/2)/100%_var(--b)]
                    max-xl:grid max-xl:gap-4 ${
                      isArabic
                        ? "max-xl:[background:linear-gradient(var(--default-b)_0_0)_no-repeat_calc(100%_-_(var(--circle)_-_var(--b))/2)_50%/var(--b)_100%]"
                        : "max-xl:[background:linear-gradient(var(--default-b)_0_0)_no-repeat_calc((var(--circle)_-_var(--b))/2)_50%/var(--b)_100%]"
                    }
                    xl:flex [dir='rtl']:xl:flex-row-reverse`}
                >
                  {tabs[activeTab].steps.map((step, index) => (
                    <li
                      key={index}
                      className={`
                        grid gap-3 font-sans relative
                        max-xl:flex max-xl:items-center
                        [counter-increment:step]
                        before:content-[counter(step)] before:grid before:place-content-center
                        before:aspect-square before:h-[var(--circle)] before:border-[5px]
                        before:border-white before:box-border
                        before:rounded-full before:font-mono before:z-[1] 
                        before:bg-gradient-to-r before:from-[#E95A56] before:to-[#833330] 
                        before:text-[var(--active-c)] before:relative 
                        before:${isArabic ? "right-[39%]" : "left-[39%]"}
                        [@media(min-width:1280px)]:before:mx-auto
                        max-xl:before:left-0 max-xl:before:right-0
                        w-[17rem] max-xl:w-full
                      `}
                    >
                      <span className="text-gray-700 xl:text-center xl:w-full max-xl:ml-4 max-xl:[dir='rtl']:ml-0 max-xl:[dir='rtl']:mr-4">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <p className="text-center text-gray-500 text-lg py-[6.5rem]">
                {t("common.comingSoon")}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestSteps;
