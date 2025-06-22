import { FiPhone } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import {
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import ScrollToTop from "./ScrollToTop";

type Links = {
  title: string;
  url: string;
  isDisabled?: boolean;
  openLinkInNewTab?: boolean;
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type ColumnLinks = {
  columnHeader?: string;
  links: Links[];
};

type Props = {
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Footer = async () => {
  const t = await getTranslations();
  const currentYear = new Date().getFullYear();

  const footerData: Props = {
    columnLinks: [
      {
        columnHeader: t("footer.aboutUs"),
        links: [
          { title: t("footer.missionAndVision"), url: "/about/who-we-are" },
          { title: t("footer.ministersMessage"), url: "/about/who-we-are" },
          { title: t("footer.ourSectors"), url: "/about/general-directorates" }, // Im not sure if this is linking to the correct page
          { title: t("footer.ourTeam"), url: "/about/who-we-are" },
        ],
      },
      {
        columnHeader: t("footer.investInOman"),
        links: [
          { title: t("footer.investorsProgram"), url: "/invest" },
          { title: t("footer.investInOman"), url: "/invest" },
        ],
      },
      {
        columnHeader: t("footer.lawsAndRegulations"),
        links: [
          { title: t("footer.royalDecrees"), url: "#", isDisabled: true },
          { title: t("footer.lawsAndRegulations"), url: "#", isDisabled: true },
        ],
      },
      {
        columnHeader: t("footer.ourPlatforms"),
        links: [
          {
            title: t("footer.omanBusinessPlatform"),
            url: "https://www.business.gov.om",
            openLinkInNewTab: true,
          },
          {
            title: t("footer.hazmPlatform"),
            url: "https://hazm.gov.om",
            openLinkInNewTab: true,
          },
          {
            title: t("footer.omanResidence"),
            url: "https://omanresidence.gov.om",
            openLinkInNewTab: true,
          },
          {
            title: t("footer.investInOman"),
            url: "https://investoman.om",
            openLinkInNewTab: true,
          },
          {
            title: t("footer.omanBusinessForum"),
            url: "https://obf.om",
            openLinkInNewTab: true,
          },
          {
            title: t("footer.maroof"),
            url: "https://maroof.om",
            openLinkInNewTab: true,
          },
          {
            title: t("footer.omanExportsPlatform"),
            url: "https://exports.om",
            openLinkInNewTab: true,
          },
          {
            title: t("footer.madeInOman"),
            url: "https://madeinoman.gov.om",
            openLinkInNewTab: true,
          },
        ],
      },
      {
        columnHeader: t("footer.contactUs"),
        links: [
          { title: t("footer.surveys"), url: "#", isDisabled: true },
          { title: t("footer.ourBranches"), url: "#", isDisabled: true },
          { title: t("footer.faq"), url: "#", isDisabled: true },
        ],
      },
    ],
    socialMediaLinks: [
      {
        url: "https://www.instagram.com/tejarah_om/",
        icon: <BiLogoInstagram className="size-6" />,
      },
      {
        url: "https://x.com/tejarah_om",
        icon: <FaXTwitter className="size-6 p-0.5" />,
      },
      {
        url: "https://www.linkedin.com/company/tejarah-om",
        icon: <BiLogoLinkedinSquare className="size-6" />,
      },
      {
        url: "https://www.youtube.com/channel/UCXd3XBW70tAfqPvnZs2a-Yw",
        icon: <BiLogoYoutube className="size-6" />,
      },
    ],
  };

  return (
    <footer
      id="relume"
      className="relative px-12 py-12 md:py-18 lg:py-20 bg-[#340201] text-white overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-[15%] bottom-[-2%] w-[min(45rem,40vw)] h-[min(20rem,20vw)] bg-[url('/assets/footer/footer_pattern.svg')] bg-contain bg-no-repeat opacity-50" />
        <div className="absolute left-[15%] top-[-1%] w-[min(45rem,40vw)] h-[min(20rem,20vw)] bg-[url('/assets/footer/footer_pattern.svg')] bg-contain bg-no-repeat opacity-50 rotate-180" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row border-b-0 md:border-b border-white pb-10">
          <div className="mr-4 min-w-[25%]">
            <div className="flex items-center gap-1 mb-8">
              <div dir="ltr" className="flex items-center gap-1">
                <a href="/">
                  <img
                    src="/assets/navbar/ministryLogo.svg"
                    alt="Ministry of Commerce, Industry and Investment Promotion"
                    className="inline-block"
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
            <div className="rb-6 mb-6 md:mb-8">
              <div>
                <p className="mb-1 text-sm font-bold flex items-center gap-2">
                  <IoLocationOutline className="w-5 h-5" />
                  {t("footer.address")}
                </p>
                <p className="text-sm">{t("footer.addressLine1")}</p>
                <p className="mb-5 text-sm md:mb-6">
                  {t("footer.addressLine2")}
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm font-bold flex items-center gap-2">
                  <FiPhone className="w-5 h-5" />
                  {t("footer.getInTouch")}
                </p>
                <p className="text-sm underline">
                  <a
                    href={`tel:${t("footer.phoneNumber")}`}
                    className="hover:text-[#df7272] transition duration-200"
                    dir="ltr"
                  >
                    {t("footer.phoneNumber")}
                  </a>
                </p>
                <p className="text-sm underline">
                  <a
                    href={`mailto:${t("footer.email")}`}
                    className="hover:text-[#df7272] transition duration-200"
                  >
                    {t("footer.email")}
                  </a>
                </p>
              </div>
            </div>
            <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3 mb-10 md:mb-0">
              {footerData.socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="hover:text-[#df7272] transition duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-6 sm:gap-20  w-full">
            {footerData.columnLinks.map((column, index) => (
              <ul key={index}>
                <li className="py-2 text-sm font-bold border-b border-white mb-2">
                  {column.columnHeader}
                </li>
                {column.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className={clsx(
                      "py-2 text-sm transition duration-200",
                      link.isDisabled
                        ? "text-gray-400 cursor-not-allowed pointer-events-none"
                        : "hover:text-[#df7272]"
                    )}
                  >
                    <a
                      href={link.isDisabled ? undefined : link.url}
                      target={link.openLinkInNewTab ? "_blank" : undefined}
                      rel={
                        link.openLinkInNewTab
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0 text-center mb-8">
            {t("footer.copyright", { year: currentYear })}
          </p>
          <ul className="flex justify-center items-center gap-x-6 text-sm cursor-not-allowed">
            <li className="text-gray-400 pointer-events-none">
              {/* <li className="underline hover:text-[#df7272] transition duration-200"> */}
              <a>{t("footer.privacyPolicy")}</a>
            </li>
            <li className="text-gray-400 cursor-not-allowed pointer-events-none">
              {/* <li className="underline hover:text-[#df7272] transition duration-200"> */}
              <a>{t("footer.termsOfService")}</a>
            </li>
          </ul>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
};
