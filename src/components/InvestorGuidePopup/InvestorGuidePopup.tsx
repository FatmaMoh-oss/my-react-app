"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import SecondaryButton from "../Buttons/SecondaryButton";
import { useInvestorGuide } from "@/hooks/useInvestorGuide";
import { getClientMediaUrl } from "@/api/clientAxios";

const POPUP_KEY = "investorGuideLastShown"; // Key for localStorage
const POPUP_INTERVAL = 20 * 60 * 1000; // 20 minutes in milliseconds

const InvestorGuidePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const t = useTranslations();
  const { investorGuide, isLoading, error } = useInvestorGuide();

  useEffect(() => {
    const lastShown = localStorage.getItem(POPUP_KEY);
    const now = Date.now();

    // Check if 20 minutes have passed
    if (!lastShown || now - Number(lastShown) > POPUP_INTERVAL) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsFading(true), 50);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsFading(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(POPUP_KEY, Date.now().toString()); // Save timestamp
    }, 500);
  };

  if (isLoading || error || !investorGuide) return null;

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed w-full h-full top-0 left-0 z-49 bg-black opacity-50 md:hidden transition-opacity duration-500 ease-in-out ${
          isFading ? "opacity-50" : "opacity-0"
        }`}
        // onClick={handleClose}
      ></div>
      <div
        className={`fixed bottom-[40%] md:bottom-[10%] left-auto z-50 w-[90%] md:w-[50%] h-auto bg-[#FFF1EF] rounded-[10px] border border-[#d4d8d7] flex flex-col md:flex-row p-4 transition-opacity duration-500 ease-in-out ${
          isFading ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Close Button (Popping Out) */}
        <button
          className="absolute -top-3 ltr:-right-3 rtl:-left-3 w-8 h-8 bg-black text-white border-2 border-white rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
          onClick={handleClose}
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="w-full md:w-[60%] mb-4 md:mb-0">
          <p className="text-[#2d2c2c] text-xs font-medium mb-0.5">
            {t("investorGuide.readyToInvest")}
          </p>
          <p className="text-[#2d2c2c] text-xl font-medium">
            {t("investorGuide.getInsights")}
          </p>
        </div>
        <div className="w-full md:w-[40%] flex items-center justify-end md:mx-3">
          <SecondaryButton
            buttonText={t("investorGuide.downloadInvestorGuide")}
            onClickAction={() =>
              window.open(getClientMediaUrl(investorGuide.url), "_blank")
            }
          />
        </div>
      </div>
    </>
  );
};

export default InvestorGuidePopup;
