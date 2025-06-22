import React from "react";

interface Props {
  buttonText: string;
  onClickAction: () => void;
  className?: string;
  width?: "fit" | "full" | "auto" | "responsive";
}

const SecondaryButton = ({
  onClickAction,
  buttonText,
  className = "",
  width = "responsive",
}: Props) => {
  const widthClasses = {
    fit: "w-fit",
    full: "w-full",
    auto: "w-auto",
    responsive: "w-full md:w-auto",
  };

  return (
    <button
      className={`${widthClasses[width]} rounded-[5px] outline-2 outline-[#e95a56] px-6 py-3 text-[#e95a56] text-base font-bold hover:cursor-pointer hover:text-white hover:bg-[#e95a56] transition duration-200 ${className}`}
      onClick={onClickAction}
    >
      {buttonText}
    </button>
  );
};

export default SecondaryButton;
