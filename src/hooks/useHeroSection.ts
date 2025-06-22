import { useEffect, useState } from "react";
import { clientAxios } from "@/api/clientAxios"; // You'll need a browser-safe axios wrapper
import { useLocale } from "next-intl";
import { HeroSectionItem, StrapiHeroSectionItem } from "@/types/homepage";

export function useHeroSection() {
  const [heroSectionItems, setHeroSectionItems] = useState<HeroSectionItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function fetchHeroSection() {
      try {
        const res = (
          await clientAxios(
            "/api/hero-section?populate[0]=heroSectionItems&populate[1]=heroSectionItems.media"
          )
        ).data.data;

        const heroSectionItems: HeroSectionItem[] = res.heroSectionItems.map(
          (item: StrapiHeroSectionItem) => ({
            title: locale === "ar" ? item.titleArabic : item.titleEnglish,
            description:
              locale === "ar"
                ? item.descriptionArabic
                : item.descriptionEnglish,
            url: item.media.url,
            mediaType: item.media.mime.includes("video") ? "video" : "image",
          })
        );

        setHeroSectionItems(heroSectionItems);
      } catch (err) {
        console.error("Failed to fetch hero section items", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHeroSection();
  }, []);

  return { heroSectionItems, isLoading, error };
}
