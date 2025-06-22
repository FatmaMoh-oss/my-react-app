import React from "react";

interface Props {
  buttonText: string;
  onClickAction: () => void;
  className?: string;
  width?: "fit" | "full" | "auto" | "responsive";
}

const PrimaryButton = ({
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
      className={`${widthClasses[width]} rounded-[5px] bg-[#e95a56] outline-2 outline-transparent px-6 py-3 text-white text-base font-bold hover:cursor-pointer hover:text-[#e95a56] hover:outline-[#e95a56] hover:bg-white transition duration-200 ${className}`}
      onClick={onClickAction}
    >
      {buttonText}
    </button>
  );
};

export default PrimaryButton;
