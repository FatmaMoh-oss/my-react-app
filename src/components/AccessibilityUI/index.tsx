"use client";

import { useEffect, Dispatch, SetStateAction } from "react";
import { useAccessibility } from "@/context/AccessibilityUI/context";
import { useTranslations } from "next-intl";
import {
  HiOutlineLink,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlinePhotograph,
  HiOutlineCursorClick,
} from "react-icons/hi";
import { AlignmentButton } from "@/components/AccessibilityUI/AlignmentButton";

const BUTTON_STYLES = {
  ACTIVE:
    "[&]:bg-[#e95a56] [&]:hover:bg-[#a92f33] [&]:text-white cursor-pointer transition-colors duration-300",
  RESET_ENABLED: "bg-[#833330] hover:bg-secondary-dark cursor-pointer",
  RESET_DISABLED: "bg-[#8d8d8d] cursor-not-allowed",
};

interface AccessibilityUiProps {
  openAccessibility: boolean;
  setOpenAccessibility: Dispatch<SetStateAction<boolean>>;
}

interface IncrementDecrementProps {
  title: string;
  plusOnClick: () => void;
  minusOnClick: () => void;
  placeHolder: number;
  className?: string;
  initialCountStyle?: string;
}

interface OneActionButtonProps {
  title?: string;
  onClick: () => void;
  icon: React.ReactNode;
  className: string;
}

const IncrementDecrementButton = ({
  title,
  plusOnClick,
  minusOnClick,
  placeHolder,
  className,
  initialCountStyle,
}: IncrementDecrementProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-[1rem] font-normal text-gray-700">{title}</h3>
      <div
        className={`flex w-full max-w-xs items-center justify-between bg-white transition-all duration-200 ${className}`}
      >
        <button
          onClick={minusOnClick}
          className="flex h-10 w-10 items-center justify-center bg-[#e95a56] text-white transition-colors hover:bg-[#a92f33] cursor-pointer"
        >
          <HiOutlineMinus className="text-xl" />
        </button>
        <span
          className={`flex-1 text-center text-lg px-3 font-medium ${initialCountStyle}`}
        >
          {placeHolder}
        </span>
        <button
          onClick={plusOnClick}
          className="flex h-10 w-10 items-center justify-center bg-[#e95a56] text-white transition-colors hover:bg-[#a92f33] cursor-pointer"
        >
          <HiOutlinePlus className="text-xl" />
        </button>
      </div>
    </div>
  );
};

const OneActionButton = ({
  title,
  onClick,
  icon,
  className,
}: OneActionButtonProps) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className={`p-4 transition-colors hover:bg-gray-100 ${className}`}
        onClick={onClick}
      >
        {icon}
      </button>
      {title && <span className="mt-2 text-[1rem]">{title}</span>}
    </div>
  );
};

export const AccessibilityUi = ({
  openAccessibility,
  setOpenAccessibility,
}: AccessibilityUiProps) => {
  const {
    increaseFontSize,
    increaseLetterSpacing,
    increaseLineHeight,
    decreaseFontSize,
    decreaseLineHeight,
    decreaseLetterSpacing,
    letterSpacingScale,
    fontScale,
    lineHeightScale,
    textAlign,
    handleAlignmentChange,
    highlightLinksColor,
    hideImages,
    biggerCursor,
    resetSettings,
    isResetButtonEnabled,
    visibility,
    cursor,
    resetTextAlignment,
    isTextAlignmentDefault,
    additionalSettings,
  } = useAccessibility();

  const t = useTranslations();

  useEffect(() => {
    document.body.style.textAlign = textAlign || "initial";
  }, [textAlign]);

  const getToolButtonClassName = (isActive: boolean) =>
    isActive ? BUTTON_STYLES.ACTIVE : "cursor-pointer";

  return (
    <div>
      {/* Drawer Overlay */}
      {openAccessibility && (
        <div
          className="fixed inset-0 bg-[#8d8d8d] opacity-40 z-30"
          onClick={() => setOpenAccessibility(false)}
        />
      )}

      {/* Drawer */}
      <div
        id="accessibility-drawer"
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg transition-transform duration-300 ease-in-out z-60 ${
          openAccessibility ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 mt-[4rem]">
            <h1 className="text-2xl font-medium text-[#000]">
              {t("accessibility.title")}
            </h1>
            <button
              onClick={() => setOpenAccessibility(false)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl cursor-pointer">&times;</span>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Alignment Section */}
            <section>
              <h2 className="text-[1.3rem] mb-4">
                {t("accessibility.alignment")}
              </h2>
              <div className="flex flex-wrap gap-6">
                {["justify", "left", "center", "right"].map((type) => (
                  <AlignmentButton
                    key={type}
                    type={type as "justify" | "left" | "center" | "right"}
                    currentAlign={textAlign}
                    onAlignmentChange={handleAlignmentChange}
                    title={t(`accessibility.${type}`)}
                  />
                ))}
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Adjustments Section */}
            <section>
              <h2 className="text-[1.3rem] mb-4">
                {t("accessibility.adjustments")}
              </h2>
              <div className="space-y-6">
                <IncrementDecrementButton
                  title={t("accessibility.fontSize")}
                  plusOnClick={increaseFontSize}
                  placeHolder={Math.round((fontScale - 1) / 0.25)}
                  minusOnClick={decreaseFontSize}
                  className="text-black"
                  initialCountStyle="text-black"
                />
                <IncrementDecrementButton
                  title={t("accessibility.lineHeight")}
                  plusOnClick={increaseLineHeight}
                  placeHolder={Math.round((lineHeightScale - 1) / 0.1)}
                  minusOnClick={decreaseLineHeight}
                  className="text-black"
                  initialCountStyle="text-black"
                />
                <IncrementDecrementButton
                  title={t("accessibility.letterSpacing")}
                  plusOnClick={increaseLetterSpacing}
                  placeHolder={Math.round((letterSpacingScale - 1) / 0.4)}
                  minusOnClick={decreaseLetterSpacing}
                  className="text-black"
                  initialCountStyle="text-black"
                />
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* More Tools Section */}
            <section>
              <h2 className="text-[1.3rem] mb-4">
                {t("accessibility.moreTools")}
              </h2>
              <div className="flex flex-wrap gap-6">
                <OneActionButton
                  title={t("accessibility.highlightLinks")}
                  icon={<HiOutlineLink className="text-2xl" />}
                  onClick={() =>
                    highlightLinksColor("#844848", "#FFD700", "underline")
                  }
                  className={getToolButtonClassName(
                    additionalSettings.background === "#844848" ||
                      additionalSettings.color === "#FFD700" ||
                      additionalSettings.textDecoration === "underline"
                  )}
                />
                <OneActionButton
                  title={t("accessibility.hideImages")}
                  icon={<HiOutlinePhotograph className="text-2xl" />}
                  onClick={() => hideImages("hidden")}
                  className={getToolButtonClassName(visibility === "hidden")}
                />
                <OneActionButton
                  title={t("accessibility.biggerCursor")}
                  icon={<HiOutlineCursorClick className="text-2xl" />}
                  onClick={biggerCursor}
                  className={getToolButtonClassName(Boolean(cursor))}
                />
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Reset Buttons */}
            <section className="space-y-4">
              <button
                className={`w-full py-2 px-6 text-lg text-white transition-colors ${
                  isTextAlignmentDefault()
                    ? BUTTON_STYLES.RESET_DISABLED
                    : BUTTON_STYLES.RESET_ENABLED
                }`}
                onClick={resetTextAlignment}
                disabled={isTextAlignmentDefault()}
              >
                {t("accessibility.resetAlignments")}
              </button>

              <button
                className={`w-full py-2 px-6 text-lg text-white transition-colors flex items-center justify-center gap-2 ${
                  isResetButtonEnabled()
                    ? BUTTON_STYLES.RESET_ENABLED
                    : BUTTON_STYLES.RESET_DISABLED
                }`}
                onClick={resetSettings}
                disabled={!isResetButtonEnabled()}
              >
                {t("accessibility.reset")}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityUi;
