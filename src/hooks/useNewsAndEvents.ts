"use client";

import { useEffect, useState } from "react";
import clientAxios from "@/api/clientAxios";
import { NewsAndEvent, StrapiNewsAndEvent } from "@/types/homepage";
import { useLocale } from "next-intl";

export const useNewsAndEvents = () => {
  const locale = useLocale();

  const [newsAndEvents, setNewsAndEvents] = useState<NewsAndEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    clientAxios
      .get<{ data: StrapiNewsAndEvent[] }>("/api/news-and-events?populate=*")
      .then((res) => {
        const transformed: NewsAndEvent[] = res.data.data.map((item) => {
          const isArabic = locale === "ar";

          return {
            id: item.documentId,
            title: isArabic ? item.titleArabic : item.titleEnglish,
            content: isArabic ? item.contentArabic : item.contentEnglish,
            location: isArabic ? item.locationArabic : item.locationEnglish,
            date: item.date,
            tags:
              item.tags?.map((tag) =>
                isArabic ? tag.tagArabic : tag.tagEnglish
              ) ?? [],
            thumbnailUrl: item.thumbnail?.url ?? "",
          };
        });

        setNewsAndEvents(transformed);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch news and events.");
        console.error(err);
        setLoading(false);
      });
  }, [locale]); // re-run if locale changes

  return { newsAndEvents, loading, error };
};
