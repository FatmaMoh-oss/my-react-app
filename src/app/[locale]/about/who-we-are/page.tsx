"use client";

import { useTranslations } from "next-intl";
import WelcomeMessage from "../../_components/WelcomeMessage";
import ManagementTeam from "../../_components/ManagementTeam";
import { useLocale } from "next-intl";
import { useTeams, useTeamMembers } from "@/hooks";
import Loading from "@/components/Loading/Loading";

const AboutPage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const { teams, isLoading: teamsLoading } = useTeams();
  const { teamMembers, isLoading: teamMembersLoading } = useTeamMembers();

  // Create managementTeams structure
  const managementTeams = teams?.reduce((acc, team) => {
    // Get team members for current team
    const teamMembersList = teamMembers?.filter(
      (member) => member.teamId === team.id
    );

    // Sort team members by order
    const sortedMembers = teamMembersList?.sort((a, b) => a.order - b.order);

    // Add team members to accumulator
    if (sortedMembers && sortedMembers.length > 0) {
      acc[team.id] = sortedMembers;
    }

    return acc;
  }, {} as Record<number, typeof teamMembers>);

  // Sort teams by order
  const sortedTeams = teams?.sort((a, b) => a.order - b.order);

  return (
    <main className="mt-15 md:mt-18 bg-white">
      <div className="w-full h-94 md:h-[39rem] overflow-hidden relative">
        <div className="absolute inset-0">
          <video
            playsInline
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source
              src="/assets/common/about_us_header_video.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/assets/common/banner-cover.svg')] bg-cover bg-center bg-no-repeat z-20 opacity-50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 md:px-16 text-center xl:px-[28%]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-lg mb-6">
            <span className="font-bold">{`${t(
              "pages.whoWeAre.aboutUs"
            )}:`}</span>{" "}
            <span className="font-normal">{t("pages.whoWeAre.title")}</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white drop-shadow-lg max-w-4xl">
            {t("pages.whoWeAre.subTitle")}
          </p>
        </div>
      </div>
      <WelcomeMessage />
      <div
        className="relative bg-cover bg-center text-white py-16 px-6 mb-[4rem] mt-[2rem]"
        style={{
          backgroundImage: "url('/assets/common/vision-bg.png')",
        }}
      >
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          {/* Vision Section */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="bg-cover bg-center w-16 h-16"
              style={{
                backgroundImage: "url('/assets/common/logo-2.svg')",
              }}
            />
            <h2 className="text-2xl font-bold">
              {t("pages.whoWeAre.ourVision")}
            </h2>
            <p className="max-w-md">{t("pages.whoWeAre.ourVisionMessage")}</p>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="bg-cover bg-center w-16 h-16"
              style={{
                backgroundImage: "url('/assets/common/logo-2.svg')",
                transform: "rotate(-90deg)",
              }}
            />
            <h2 className="text-2xl font-bold">
              {t("pages.whoWeAre.ourMission")}
            </h2>
            <p className="max-w-md">{t("pages.whoWeAre.ourMissionMessage")}</p>
          </div>
        </div>
      </div>
      {teamsLoading || teamMembersLoading ? (
        <Loading />
      ) : (
        sortedTeams?.map((team, i) => (
          <section key={team.id} className={`relative w-full px-16 py-10`}>
            <div className={`mb-7 ${isRTL ? "text-right" : "text-left"}`}>
              {i === 0 && (
                <p className="text-[#BB1613] text-3sm font-semibold">
                  {t("pages.whoWeAre.getToKnowUs")}
                </p>
              )}
              <h2 className="text-3xl font-bold mt-4 text-gray-800">
                {team.name}
              </h2>
            </div>

            <ManagementTeam
              svgBackground="/assets/common/about-page.svg"
              images={managementTeams[team.id]?.map((member) => ({
                image: member.imageUrl,
                name: member.name,
                title: member.positionTitle,
              }))}
              backgroundColor="#EBEEEE"
              titleTextColor="#6E6E6E"
              nameTextColor="#000000"
            />
          </section>
        ))
      )}
    </main>
  );
};

export default AboutPage;
