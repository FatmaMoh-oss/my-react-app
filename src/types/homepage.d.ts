export interface Partner {
  entity: string;
  url: string;
  logo: {
    url: string;
  };
}

export interface StrapiAdBanner {
  titleArabic: string;
  titleEnglish: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  buttonTextArabic: string;
  buttonTextEnglish: string;
  buttonUrlArabic: string;
  buttonUrlEnglish: string;
  imageArabic: {
    url: string;
  };
  imageEnglish: {
    url: string;
  };
}

export interface AdBanner {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  imageUrl: string;
}

export interface StrapiNewsAndEvent {
  documentId: string;
  titleArabic: string;
  titleEnglish: string;
  contentArabic: string;
  contentEnglish: string;
  locationArabic: string;
  locationEnglish: string;
  date: string;
  tags: {
    tagArabic: string;
    tagEnglish: string;
  }[];
  thumbnail: {
    url: string;
  };
}

export interface NewsAndEvent {
  id: string;
  title: string;
  content: string;
  location: string;
  date: string;
  tags: string[];
  thumbnailUrl: string;
}

export interface StrapiStatistic {
  statisticArabic: string;
  statisticEnglish: string;
  descriptionArabic: string;
  descriptionEnglish: string;
}

export interface Statistic {
  statistic: string;
  description: string;
}

export interface StrapiHeroSectionItem {
  titleArabic: string;
  titleEnglish: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  media: {
    mime: string;
    url: string;
  };
}

export interface HeroSectionItem {
  title: string;
  description: string;
  mediaType: "video" | "image";
  url: string;
}
