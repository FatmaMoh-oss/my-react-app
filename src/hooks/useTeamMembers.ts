import { useEffect, useState } from "react";
import { StrapiTeamMember, TeamMember } from "@/types/shared";
import { clientAxios } from "@/api/clientAxios";
import { useLocale } from "next-intl";

interface StrapiResponse {
  data: StrapiTeamMember[];
}

const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const locale = useLocale();

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const res = await clientAxios("/api/team-members?populate=*");
        const response: StrapiResponse = res.data;

        const localizedData: TeamMember[] = response.data.map((member) => ({
          id: member.id,
          name: locale === "ar" ? member.nameArabic : member.nameEnglish,
          positionTitle:
            locale === "ar"
              ? member.positionTitleArabic
              : member.positionTitleEnglish,
          order: member.order,
          teamId: member.team.id,
          imageUrl: member.image.url,
        }));

        setTeamMembers(localizedData);
      } catch (err) {
        console.error("Failed to fetch team members data", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeamMembers();
  }, [locale]);

  return { teamMembers, isLoading, error };
};

export default useTeamMembers;
