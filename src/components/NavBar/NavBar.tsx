"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import LocaleSwitcher from "../../components/LocaleSwitcher/LocaleSwitcher";
import { useTranslations } from "next-intl";
import { SubMenu } from "./SubMenu";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { RxAccessibility } from "react-icons/rx";
import { AccessibilityUi } from "@/components/AccessibilityUI";

export type NavbarProps = React.ComponentPropsWithoutRef<"section">;

export const Navbar = () => {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openAccessibility, setOpenAccessibility] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();
  const isMobile = useMediaQuery("(max-width: 991px)");

  const isCurrentPage = (url: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");

    // Special handling for home page
    if (url === "/") {
      return pathWithoutLocale === "" || pathWithoutLocale === "/";
    }

    return pathWithoutLocale === url || pathname === url;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navbarComponents = {
    navLinks: [
      {
        title: t("header.home"),
        url: "/",
        isDisabled: false,
      },
      {
        title: t("header.aboutUs"),
        url: "/about",
        isDisabled: false,
        subMenuLinks: [
          { title: t("header.whoWeAre"), url: "/about/who-we-are" },
          {
            title: t("pages.generalDirectorates.generalDirectorates"),
            url: "/about/general-directorates",
          },
        ],
      },
      {
        title: t("header.investInOman"),
        url: "/invest",
        isDisabled: false,
        // subMenuLinks: [{ title: "Sub Menu Item 1", url: "#" }],
      },
      {
        title: t("header.ourPlatform"),
        url: "/our-platforms",
        isDisabled: false,
        // subMenuLinks: [{ title: "Sub Menu Item 1", url: "#" }],
      },
      {
        title: t("header.lawsAndRegulations"),
        url: "/laws",
        isDisabled: false,
        // subMenuLinks: [{ title: "Sub Menu Item 1", url: "#" }],
      },
      {
        title: t("header.mediaCentre"),
        url: "/media",
        isDisabled: true,
        // subMenuLinks: [{ title: "Sub Menu Item 1", url: "#" }],
      },
      {
        title: t("header.eParticipation"),
        url: "contact",
        isDisabled: false,
      }, 
         {
        title: t("header.OpenData"),
        url: "/open-data",
        isDisabled: false,
      },

       
      
    ],
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      if (!prev) {
        // If we're opening the mobile menu, close accessibility
        setOpenAccessibility(false);
      }
      return !prev;
    });
  };

  const toggleAccessibility = () => {
    setOpenAccessibility((prev) => {
      if (!prev) {
        // If we're opening accessibility, close mobile menu
        setIsMobileMenuOpen(false);
      }
      return !prev;
    });
  };

  if (!isMounted) {
    return (
      <section className="fixed z-90 text-white flex w-full items-center bg-background-primary lg:min-h-18 lg:px-4 bg-gradient-to-r from-[#3C0404] to-[#8B1C20]">
        <div className="size-full lg:flex lg:items-center">
          <div className="flex min-h-16 items-center justify-between px-10 md:min-h-18 lg:min-h-full lg:px-0">
            <div className="flex items-center px-4 lg:px-6" dir="ltr">
              <a href="/">
                <img
                  src="/assets/navbar/ministryLogo.svg"
                  alt="Ministry of Commerce, Industry and Investment Promotion"
                />
              </a>
              <a href="/">
                <img
                  className="ml-2"
                  src="/assets/navbar/khanjar.svg"
                  alt="Ministry of Commerce, Industry and Investment Promotion"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="relume"
        className="fixed z-90 text-white flex w-full items-center bg-background-primary lg:min-h-18 lg:px-10 bg-gradient-to-r from-[#3C0404] to-[#8B1C20]"
      >
        <div className="size-full lg:flex lg:items-center">
          <div
            className="flex min-h-16 items-center justify-between px-10 md:min-h-18 lg:min-h-full lg:px-0"
            dir="ltr"
          >
            <div className="flex items-center px-4 lg:px-6" dir="ltr">
              <a href="/">
                <img
                  src="/assets/navbar/ministryLogo.svg"
                  alt="Ministry of Commerce, Industry and Investment Promotion"
                />
              </a>
              <a href="/">
                <img
                  className="ml-2"
                  src="/assets/navbar/khanjar.svg"
                  alt="Ministry of Commerce, Industry and Investment Promotion"
                />
              </a>
            </div>
            <button
              className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
              onClick={toggleMobileMenu}
            >
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-white"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={topLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-white"
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={middleLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-white"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={bottomLineVariants}
              />
            </button>
          </div>
          <motion.div
            variants={{
              open: {
                height: "var(--height-open, 100dvh)",
              },
              close: {
                height: "var(--height-closed, 0)",
              },
            }}
            initial="close"
            exit="close"
            animate={isMobileMenuOpen ? "open" : "close"}
            transition={{ duration: 0.4 }}
            className={`overflow-hidden ${
              isMobileMenuOpen ? "px-0" : "px-[5%]"
            } lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto] w-full lg:justify-between`}
          >
            <div
              className={`flex flex-col items-center gap-4 lg:flex-row ${
                isMobileMenuOpen ? "pl-0" : "p-5"
              }`}
            >
              {/* {navbarComponents.navLinks.map((navLink, index) =>
              navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                <SubMenu key={index} navLink={navLink} isMobile={isMobile} />
              ) : (
                <a
                  key={index}
                  href={navLink.url}
                  className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2 hover:text-[#df7272] hover:underline decoration-[2px] underline-offset-4 transition duration-200"
                >
                  {navLink.title}
                </a>
              )
            )} */}
              {navbarComponents.navLinks.map((navLink, index) =>
                navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                  <SubMenu key={index} navLink={navLink} isMobile={isMobile} />
                ) : navLink.isDisabled ? (
                  <span
                    key={index}
                    className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2 text-gray-400 cursor-not-allowed pointer-events-none"
                  >
                    {navLink.title}
                  </span>
                ) : (
                  <a
                    key={index}
                    href={navLink.url}
                    className={`block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2 hover:text-[#df7272] hover:underline decoration-[2px] underline-offset-4 transition duration-200 ${
                      isCurrentPage(navLink.url)
                        ? "text-[#df7272] underline decoration-[2px] underline-offset-4"
                        : ""
                    }`}
                  >
                    {navLink.title}
                  </a>
                )
              )}
            </div>
            <div className="mt-6 flex flex-col items-center gap-6 lg:ml-4 lg:mt-0 lg:flex-row">
              <LocaleSwitcher isMobile={isMobile} />
              <RxAccessibility
                className="rounded-4xl w-7 h-7 hover:cursor-pointer text-[#E95A56] bg-white"
                onClick={toggleAccessibility}
              />
            </div>
          </motion.div>
        </div>
      </section>
      <AccessibilityUi
        openAccessibility={openAccessibility}
        setOpenAccessibility={setOpenAccessibility}
      />
    </>
  );
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
