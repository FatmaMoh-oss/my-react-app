import { useEffect, useState } from "react";
import { InvestorGuide, StrapiInvestorGuide } from "@/types/shared";
import { clientAxios } from "@/api/clientAxios";
import { useLocale } from "next-intl";

export function useInvestorGuide() {
  const [investorGuide, setInvestorGuide] = useState<InvestorGuide | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function fetchInvestorGuide() {
      try {
        const res: StrapiInvestorGuide = (
          await clientAxios("/api/investor-guide?populate=*")
        ).data.data;

        const url =
          locale === "ar"
            ? res.investorGuideArabic.url
            : res.investorGuideEnglish.url;

        setInvestorGuide({ url });
      } catch (err) {
        console.error("Failed to fetch investor guide", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInvestorGuide();
  }, []);

  return { investorGuide, isLoading, error };
}
