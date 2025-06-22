import { serverAxios } from "@/api/serverAxios";
import { Statistic, StrapiStatistic } from "@/types/homepage";
import { getLocale } from "next-intl/server";

export async function getStatistics(): Promise<Statistic[]> {
  try {
    const locale = await getLocale();
    const strapiResp = await serverAxios("/api/statistic?populate=*");

    const strapiStatistics: StrapiStatistic[] = strapiResp.statistics;

    const statistics: Statistic[] = strapiStatistics.map((stat) => ({
      statistic: locale === "en" ? stat.statisticEnglish : stat.statisticArabic,
      description:
        locale === "en" ? stat.descriptionEnglish : stat.descriptionArabic,
    }));
    return statistics;
  } catch (error) {
    console.error("Failed to fetch statistics", error);
    return [];
  }
}
