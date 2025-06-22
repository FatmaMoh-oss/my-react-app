
import { serverAxios } from "@/api/serverAxios";
import { StrapiOpenData, OpenData } from "@/types/shared.d";
import { getLocale } from "next-intl/server";

export async function getOpenData(): Promise<OpenData[]> {
  try {
    const locale = await getLocale();
    const isArabic = locale.startsWith("ar");
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";

    const strapiResp = await serverAxios(
      "/api/albyanat-almftwhts?populate=*"
    );

    const strapiData: StrapiOpenData[] = strapiResp.data.data;

    // Flatten files into OpenData[]
    const allFiles: OpenData[] = strapiData.flatMap((item) => {
      const attr = item.attributes;
      const files = isArabic ? attr.fileUrlAr : attr.fileUrlEn;
      const fileName = isArabic ? attr.fileNameAr : attr.fileNameEn;
      const description = isArabic ? attr.decriptionAr : attr.descriptionEn;

      if (!Array.isArray(files)) return [];

      return files.map((file) => ({
        id: item.id, // parent dataset ID
        fileName,
        fileUrl: `${baseUrl}${file.url}`,
        description,
      }));
    });

    return allFiles;
  } catch (error) {
    console.error("Failed to fetch files", error);
    return [];
  }
}
