import { useTranslations } from "next-intl";

const WelcomeMessage = () => {
  const t = useTranslations();

  return (
    <section className="p-6 md:py-12 md:px-16 flex flex-col xl:flex-row items-start mt-5">
      <div className="xl:w-1/2 text-gray-800 xl:ltr:pr-40 xl:rtl:pl-40 mt-10 xl:mt-0">
        <p className="text-[#BB1613] text-sm font-semibold">
          {t("pages.whoWeAre.title1")}
        </p>
        <h2 className="text-2xl font-bold mt-2">
          {t("pages.whoWeAre.title2")}
        </h2>
        <blockquote className="italic text-lg text-gray-600 mt-4 ltr:border-l-4 rtl:border-r-4 border-[#BB1613] ltr:pl-4 rtl:pr-4">
          {`"${t("pages.whoWeAre.message")}"`}
        </blockquote>
        <p className="mt-4 text-gray-700">{t("pages.whoWeAre.text")}</p>
        <h3 className="mt-6 font-semibold text-lg">
          {t("pages.whoWeAre.whyInvest")}
        </h3>
        <ul className="mt-2 space-y-3 text-gray-700">
          <li className="flex gap-2 max-[618px]:flex-col max-[618px]:items-start items-center">
            <div className="flex gap-2 items-center">
              <img
                src="/assets/welcome-message/icon-1.svg"
                alt="icon"
                className="w-[18px] h-[18px]"
              />
              <strong>{t("pages.whoWeAre.investPoints.item1title")}</strong>
            </div>
            <span className="max-[618px]:mt-1">
              {t("pages.whoWeAre.investPoints.item1text")}
            </span>
          </li>
          <li className="flex gap-2 max-[618px]:flex-col max-[618px]:items-start items-center">
            <div className="flex gap-2 items-center">
              <img
                src="/assets/welcome-message/icon-2.svg"
                alt="icon"
                className="w-[20px] h-[20px]"
              />
              <strong>{t("pages.whoWeAre.investPoints.item2title")}</strong>
            </div>
            <span className="max-[618px]:mt-1">
              {t("pages.whoWeAre.investPoints.item2text")}
            </span>
          </li>
          <li className="flex gap-2 max-[618px]:flex-col max-[618px]:items-start items-center">
            <div className="flex gap-2 items-center">
              <img
                src="/assets/welcome-message/icon-3.svg"
                alt="icon"
                className="w-[20px] h-[20px]"
              />
              <strong>{t("pages.whoWeAre.investPoints.item3title")}</strong>
            </div>
            <span className="max-[618px]:mt-1">
              {t("pages.whoWeAre.investPoints.item3text")}
            </span>
          </li>
          <li className="flex gap-2 max-[618px]:flex-col max-[618px]:items-start items-center">
            <div className="flex gap-2 items-center">
              <img
                src="/assets/welcome-message/icon-4.svg"
                alt="icon"
                className="w-[20px] h-[20px]"
              />
              <strong>{t("pages.whoWeAre.investPoints.item4title")}</strong>
            </div>
            <span className="max-[618px]:mt-1">
              {t("pages.whoWeAre.investPoints.item4text")}
            </span>
          </li>
        </ul>
      </div>
      <div className="xl:w-[36%] xl:w-1/2 mt-6 xl:mt-0 mt-20 ltr:xl:ml-auto rtl:xl:mr-auto order-1 xl:order-2">
        <img
          src="/assets/images/Qais_AlYousef.png"
          alt="Qais bin Mohammed Al Yousef"
          className="shadow-lg w-full h-auto"
        />
        <p className="mt-6 font-semibold">{t("pages.whoWeAre.ministerName")}</p>
        <p className="text-gray-600">{t("pages.whoWeAre.ministerTitle")}</p>
      </div>
    </section>
  );
};

export default WelcomeMessage;
