import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const imageBaseUrl = process.env.STRAPI_BASE_URL || "http://strapi:1337";
const imageClientBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Add standalone export
  reactStrictMode: true,
  images: {
    domains: [
      new URL(imageBaseUrl).hostname,
      new URL(imageClientBaseUrl).hostname,
    ],
  },
};

export default withNextIntl(nextConfig);
