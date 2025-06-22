import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import clsx from "clsx";

interface ScrollButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  canScroll: boolean;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  onClick,
  canScroll,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!canScroll}
      className={clsx(
        "transition-colors duration-300 rounded-full border-2 w-10 h-10 flex items-center justify-center",
        {
          "text-[#E95A56] border-[#E95A56] hover:cursor-pointer hover:bg-[#f8e2e1]":
            canScroll,
          "text-[#677677] border-[#677677] hover:cursor-not-allowed":
            !canScroll,
        }
      )}
    >
      {direction === "prev" ? (
        <FaArrowLeft className="w-4 h-4" />
      ) : (
        <FaArrowRight className="w-4 h-4" />
      )}
    </button>
  );
};

export default ScrollButton;
