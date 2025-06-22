import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <TbError404 className="text-8xl text-red-950 mb-2" />
      <h2 className="text-2xl font-bold mb-2">{t("notFound.pageNotFound")}</h2>
      <p className="text-red-950 text-base mb-6">
        {t("notFound.couldNotFind")}
      </p>
      <Link
        href="/"
        className="inline-flex rounded-[5px] bg-[#e95a56] outline-2 outline-transparent px-6 py-3 text-white text-base font-bold hover:cursor-pointer hover:text-[#e95a56] hover:outline-[#e95a56] hover:bg-white transition duration-200 items-center"
      >
        {t("notFound.returnHome")}
      </Link>
    </div>
  );
}
