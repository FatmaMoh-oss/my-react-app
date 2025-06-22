import { useEffect, useState } from "react";
import { ServicesGuide, StrapiServicesGuide } from "@/types/shared";
import { clientAxios } from "@/api/clientAxios";
import { useLocale } from "next-intl"; 

const useServicesGuide = () => {
  const [servicesGuide, setServicesGuide] = useState<ServicesGuide | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function fetchServicesGuide() {
      try {
        const res: StrapiServicesGuide = (
          await clientAxios("/api/services-guide?populate=*")
        ).data.data;

        const url =
          locale === "ar"
            ? res.servicesGuideArabic.url
            : res.servicesGuideEnglish.url;

        setServicesGuide({ url });
      } catch (err) {
        console.error("Failed to fetch services guide", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServicesGuide();
  }, []);

  return { servicesGuide, isLoading, error };
};

export default useServicesGuide;
