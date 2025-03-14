import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MainRegionName } from "./utils/mainData";

export const metadata: Metadata = {
  title: "Select Your Current Region",
  description: "Select your current region to get personalized recommendations and offers.",
};

export default async function MainHome() {
  const cookieStore = await cookies();
  const regionFromCookie = cookieStore.get("region")?.value?.toLowerCase();


  const finalRegion = regionFromCookie || MainRegionName;

  redirect(`/${finalRegion}/cars/home`);
}
