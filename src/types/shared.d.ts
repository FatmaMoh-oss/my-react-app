export interface StrapiInvestorGuide {
  investorGuideArabic: {
    url: string;
  };
  investorGuideEnglish: {
    url: string;
  };
}

export interface InvestorGuide {
  url: string;
}

export interface StrapiManagementTeam {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  order: number;
}

export interface ManagementTeam {
  id: number;
  name: string;
  order: number;
}

export interface StrapiTeamMember {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  positionTitleArabic: string;
  positionTitleEnglish: string;
  order: number;
  team: StrapiManagementTeam;
  image: { url: string };
}

export interface TeamMember {
  id: number;
  name: string;
  positionTitle: string;
  order: number;
  teamId: number;
  imageUrl: string;
}

export interface StrapiServicesGuide {
  servicesGuideArabic: {
    url: string;
  };
  servicesGuideEnglish: {
    url: string;
  };
}

export interface ServicesGuide {
  url: string;
}

export interface StrapiOpenData {
  id: number;
  attributes: {
    fileNameEn: string | null;
    fileNameAr: string | null;
    fileUrlEn?: {
      url: string; }[];
    fileUrlAr?: {
      url: string; }[];
      decriptionAr: string;
      descriptionEn: string;
  };
}

export interface OpenData {
  id: number;
  fileName: string | null;
  fileUrl: string;
  description: string;
}

