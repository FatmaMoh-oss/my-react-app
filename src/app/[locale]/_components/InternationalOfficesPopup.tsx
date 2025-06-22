import { SetStateAction } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CardInfo } from "./ServiceCard";

interface Props {
  setOpenCard: (value: SetStateAction<CardInfo | undefined>) => void;
  cardInfo: CardInfo;
}

const InternationalOfficesPopup = ({ setOpenCard, cardInfo }: Props) => {
  const t = useTranslations();
  const locale = useLocale();

  const isRtl = locale === "ar";

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="relative bg-[#FFF1EF] w-full max-w-4xl p-[3rem] shadow-lg max-h-full overflow-y-auto">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/common/about-page.svg"
            alt="Background"
            className={`absolute w-[45%] h-[60%] object-fill ${
              isRtl ? "left-0" : "transform rotate-180 right-0 top-12"
            } pointer-events-none`}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setOpenCard(undefined)}
          className={`absolute top-4 ${
            isRtl ? "left-6" : "right-6"
          } text-3xl text-gray-600 hover:text-red-600 hover:cursor-pointer`}
        >
          &times;
        </button>

        {/* Popup Content */}
        <div className="relative z-10">
          {/* Office Info */}
          <div className="mb-6">
            <p className="text-red-800 font-semibold text-sm mb-1">
              {t(
                "pages.generalDirectorates.serviceCentres.internationalOffices.title"
              )}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {cardInfo?.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {cardInfo?.description}
            </p>
          </div>

          {/* Contact Info + Location Image */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Contact Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <img
                  src="/assets/common/phone.svg"
                  alt="icon"
                  width={20}
                  height={20}
                  className="text-[#BB1613]"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {t("common.phone")}
                  </h3>
                  <p className="text-gray-600">{cardInfo?.phone.join(" / ")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src="/assets/common/mail.svg"
                  alt="icon"
                  width={20}
                  height={20}
                  className="text-[#BB1613]"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {t("common.email")}
                  </h3>
                  <p className="text-gray-600">{cardInfo?.email.join(" / ")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src="/assets/common/pin.svg"
                  alt="icon"
                  width={22}
                  height={22}
                  className="text-[#BB1613]"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {t("common.location")}
                  </h3>
                  <a
                    href={cardInfo?.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#BB1613] text-sm font-bold hover:text-[#900000] hover:underline hover:cursor-pointer"
                  >
                    {t("common.view")}
                  </a>
                </div>
              </div>
            </div>

            {/* Location Image */}
            <div className="flex-1">
              <img
                src={cardInfo?.imageSrc}
                alt="Location"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalOfficesPopup;
