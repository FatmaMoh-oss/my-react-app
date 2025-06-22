import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  // eslint-disable-next-line
  if (!routing.locales.includes(resolvedLocale as any)) notFound();

  return {
    locale: resolvedLocale,
    messages: {
      ...(
        await import(`../../messages/${resolvedLocale}/${resolvedLocale}.json`)
      ).default,
      ...(
        await import(`../../messages/${resolvedLocale}/components/navbar.json`)
      ).default,
      ...(
        await import(`../../messages/${resolvedLocale}/components/footer.json`)
      ).default,
      ...(
        await import(
          `../../messages/${resolvedLocale}/pages/home/investor_guide_popup.json`
        )
      ).default,
      ...(
        await import(
          `../../messages/${resolvedLocale}/pages/home/hero_section.json`
        )
      ).default,
      ...(
        await import(
          `../../messages/${resolvedLocale}/pages/home/our_services.json`
        )
      ).default,
      ...(
        await import(
          `../../messages/${resolvedLocale}/pages/home/investor_guide_section.json`
        )
      ).default,
      ...(
        await import(
          `../../messages/${resolvedLocale}/pages/home/why_oman.json`
        )
      ).default,
      ...(
        await import(
          `../../messages/${resolvedLocale}/pages/home/partners.json`
        )
      ).default,
      ...(
        await import(
          `../../messages/${resolvedLocale}/pages/home/news_and_events.json`
        )
      ).default,
    },
  };
});
