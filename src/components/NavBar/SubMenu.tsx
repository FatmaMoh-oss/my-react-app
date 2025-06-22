import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { NavLink } from "./types";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLink;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();

  // Check if current page matches the navLink or any of its sublinks
  const isCurrentPage = (url: string) => {
    // Remove the locale prefix from pathname for comparison
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    return pathWithoutLocale === url || pathname === url;
  };

  const isMainLinkActive =
    isCurrentPage(navLink.url) ||
    navLink.subMenuLinks?.some((subLink) => isCurrentPage(subLink.url));

  return (
    <div
      className={`${isMobile ? "w-full text-center" : ""}`}
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className={`flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base hover:text-[#df7272] hover:underline decoration-[2px] underline-offset-4 transition duration-300 hover:cursor-pointer ${
          isMobile ? "justify-center" : ""
        } ${
          isMainLinkActive
            ? "text-[#df7272] underline decoration-[2px] underline-offset-4"
            : ""
        }`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span className="">{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-tr from-[#3c0404] via-[#3c0404] via-70% to-[#8b1c20] lg:absolute lg:z-50 lg:border lg:border-[#7c3434] lg:[--y-close:25%]"
          >
            {navLink.subMenuLinks?.map((subLink, index) => {
              const isActive = isCurrentPage(subLink.url);
              return (
                <a
                  key={index}
                  href={subLink.url}
                  className={`block p-3 text-md lg:px-4 lg:text-base text-white hover:bg-[#8b1c20] transition-colors duration-300 ${
                    isActive ? "bg-[#8b1c20] font-medium" : ""
                  }`}
                >
                  {subLink.title}
                </a>
              );
            })}
          </motion.nav>
        </AnimatePresence>
      )}
    </div>
  );
};
