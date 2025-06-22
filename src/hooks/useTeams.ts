import { useEffect, useState } from "react";
import { StrapiManagementTeam, ManagementTeam } from "@/types/shared";
import { clientAxios } from "@/api/clientAxios";
import { useLocale } from "next-intl";

interface StrapiResponse {
  data: StrapiManagementTeam[];
}

const useTeams = () => {
  const [teams, setTeams] = useState<ManagementTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await clientAxios("/api/teams");
        const response: StrapiResponse = res.data;

        const localizedData: ManagementTeam[] = response.data.map((team) => ({
          id: team.id,
          name: locale === "ar" ? team.nameArabic : team.nameEnglish,
          order: team.order,
        }));

        setTeams(localizedData);
      } catch (err) {
        console.error("Failed to fetch teams data", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeams();
  }, [locale]);

  return { teams, isLoading, error };
};

export default useTeams;
