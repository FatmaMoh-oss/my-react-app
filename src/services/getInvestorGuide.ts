import { serverAxios } from "@/api/serverAxios";
import { InvestorGuide, StrapiInvestorGuide } from "@/types/shared";
import { getLocale } from "next-intl/server";

export async function getInvestorGuide(): Promise<InvestorGuide | null> {
  try {
    const locale = await getLocale();
    const strapiResp: StrapiInvestorGuide = await serverAxios(
      "/api/investor-guide?populate=*"
    );

    return {
      url:
        locale === "ar"
          ? strapiResp.investorGuideArabic.url
          : strapiResp.investorGuideEnglish.url,
    };
  } catch (error) {
    console.error("Failed to fetch investor guide", error);
    return null;
  }
}
