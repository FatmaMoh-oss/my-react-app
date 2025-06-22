"use client";
import { BsArrowUpShort } from "react-icons/bs";
import { CSSProperties } from "react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const initialStyles: CSSProperties = {
    opacity: 0,
    transform: "translateY(2rem)",
    visibility: "hidden",
    position: "fixed",
    bottom: "6rem",
  };

  return (
    <button
      onClick={scrollToTop}
      className="right-5 w-12 h-12 rounded-full bg-[#E95A56] border-2 border-white flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer hover:bg-[#d44f4b] z-50"
      aria-label="Scroll to top"
      style={initialStyles}
      id="scroll-to-top-button"
    >
      <BsArrowUpShort className="w-8 h-8 text-white" />
    </button>
  );
};

// Add scroll listener with RTL support
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    const button = document.getElementById("scroll-to-top-button");
    if (!button) return;

    const styles: Partial<CSSProperties> = {
      opacity: window.pageYOffset > 300 ? "1" : "0",
      transform:
        window.pageYOffset > 300 ? "translateY(0)" : "translateY(2rem)",
      visibility: window.pageYOffset > 300 ? "visible" : "hidden",
    };

    Object.assign(button.style, styles);
  });
}

export default ScrollToTop;
