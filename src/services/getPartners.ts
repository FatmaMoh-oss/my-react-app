import { serverAxios } from "@/api/serverAxios";
import { Partner } from "@/types/homepage";

export async function getPartners(): Promise<Partner[] | null> {
  try {
    const partners: Partner[] = await serverAxios(
      "/api/partners?populate=logo"
    );
    return partners;
  } catch (error) {
    console.error("Failed to fetch partners", error);
    return null;
  }
}
