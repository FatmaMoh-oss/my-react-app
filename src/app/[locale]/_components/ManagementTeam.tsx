"use client";

import { getClientMediaUrl } from "@/api/clientAxios";
import { useLocale } from "next-intl";

type ImageProps = {
  image: string;
  name: string;
  title: string;
};

type Props = {
  images: ImageProps[];
  svgBackground: string;
  nameTextColor?: string;
  titleTextColor?: string;
  backgroundColor?: string;
};

const ManagementTeam: React.FC<Props> = ({
  images = [],
  svgBackground,
  nameTextColor = "#000000",
  titleTextColor = "#555555",
  backgroundColor = "#FFFFFF",
}) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div
      className="max-w-8xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden max-w-[22rem] w-full mx-auto group"
        >
          {/* SVG Background */}
          <div
            className="absolute inset-0 z-0 h-[10rem] min-[550px]:h-[20rem] transition-all duration-300 ease-in-out overflow-hidden"
            style={{
              backgroundColor,
            }}
          >
            <img
              src={svgBackground}
              alt="Background pattern"
              className={
                isRTL
                  ? "w-full h-[100%] object-cover transition-transform duration-300 ease-in-out group-hover:-translate-x-15"
                  : "w-full h-[100%] object-cover transition-transform duration-300 ease-in-out group-hover:translate-x-15"
              }
              style={{
                backgroundColor,
                transform: isRTL ? "scaleX(-1)" : "none",
              }}
            />
            {/* Overlay for red background on hover */}
            <div className="absolute inset-0 bg-[#f9c3c3] opacity-0 group-hover:opacity-50 transition-opacity duration-1000 ease-in-out" />
          </div>

          {/* Transparent Person Image */}
          <div className="relative z-10 h-[10rem] min-[550px]:h-[20rem] overflow-hidden">
            <img
              src={getClientMediaUrl(image.image)}
              alt={image.name}
              className="w-full h-[100%] object-cover transition-transform duration-600 ease-in-out group-hover:scale-110"
            />
          </div>

          {/* Info */}
          <div className="relative z-10 py-4">
            <h3
              className="text-md font-semibold"
              style={{ color: nameTextColor }}
            >
              {image.name}
            </h3>
            <p className="text-sm mt-1" style={{ color: titleTextColor }}>
              {image.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagementTeam;
