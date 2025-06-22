import { serverAxios } from "@/api/serverAxios";
import { AdBanner, StrapiAdBanner } from "@/types/homepage";
import { getLocale } from "next-intl/server";

export async function getAdBannerData(): Promise<AdBanner | null> {
  try {
    const locale = await getLocale();
    const strapiResp: StrapiAdBanner = await serverAxios("/api/ad?populate=*");

    const adBannerData: AdBanner = {
      title: locale === "en" ? strapiResp.titleEnglish : strapiResp.titleArabic,
      description:
        locale === "en"
          ? strapiResp.descriptionEnglish
          : strapiResp.descriptionArabic,
      buttonText:
        locale === "en"
          ? strapiResp.buttonTextEnglish
          : strapiResp.buttonTextArabic,
      buttonUrl:
        locale === "en"
          ? strapiResp.buttonUrlEnglish
          : strapiResp.buttonUrlArabic,
      imageUrl:
        locale === "en"
          ? strapiResp.imageEnglish.url
          : strapiResp.imageArabic.url,
    };

    // fallback for missing button text
    if (!adBannerData.buttonText) {
      adBannerData.buttonText = locale === "en" ? "Learn More" : "اكتشف المزيد";
    }

    return adBannerData;
  } catch (error) {
    console.error("Failed to fetch ad banner", error);
    return null;
  }
}
