import type { Metadata } from "next";
import "./globals.css";
import { getMessages, getLocale } from "next-intl/server";
import { JSX } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Roboto } from "next/font/google";
import Chatbot from "../components/chatbot/Chatbot";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AccessibilityProvider } from "@/context/AccessibilityUI/context";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-en",
});

export const metadata: Metadata = {
  title: "MOCIIP",
  description: "MOCIIP Website",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Props): Promise<JSX.Element> => {
  const messages = await getMessages();
  const locale = await getLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${
        locale == "ar" ? "font-[var(--font-ar)]" : roboto.variable
      } scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <body
        className={`flex min-h-screen flex-col overflow-x-hidden bg-grey-lighter`}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Dubai"
          now={new Date()}
        >
          <AccessibilityProvider>
            {children}
            <Chatbot />
          </AccessibilityProvider>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-FGYL864WY9" />
    </html>
  );
};

export default RootLayout;
