import { useEffect, useState } from "react";
import { clientAxios } from "@/api/clientAxios";
import { StrapiOpenData, OpenData } from "@/types/shared.d";
import { useLocale } from "next-intl";

interface StrapiResponse {
  data: StrapiOpenData[];
}

const useOpenData = () => {
  const [openData, setOpenData] = useState<OpenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const locale = useLocale();
  

  useEffect(() => {
    async function fetchOpenData() {
      try {
        const res = await clientAxios<StrapiResponse>(
          "/api/albyanat-almftwhts?populate=*"
        );

        const localizedData: OpenData[] = [];

        res.data.data.forEach((item) => {
          const isArabic = locale === "ar";

          const fileName = isArabic ? item.fileNameAr : item.fileNameEn;
          const fileUrls = isArabic ? item.fileUrlAr : item.fileUrlEn;
          const description = isArabic ? item.decriptionAr : item.descriptionEn

          if (fileUrls && Array.isArray(fileUrls) && fileUrls.length > 0) {
            // Add each file as separate OpenData item
            fileUrls.forEach((file) => {
  localizedData.push({
    id: item.id,
    fileName: fileName || file.name || "Unnamed File",
    // define the document file URL
    fileUrl: file.url.startsWith("http") ? file.url : `${file.url}`,

    description: description || "",
              });
            });
          }
        });

        setOpenData(localizedData);
        setError(null);
      } catch (err: any) {
        console.log("Base URL:", process.env.NEXT_PUBLIC_STRAPI_BASE_URL);
  console.error("Failed to fetch open data files", err);
  setError(err instanceof Error ? err : new Error("Unknown error"));
} finally {
        setIsLoading(false);
      }
    }

    fetchOpenData();
  }, [locale,]);

  return { openData, isLoading, error };
};

export default useOpenData;
