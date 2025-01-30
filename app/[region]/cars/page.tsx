import { MainRegionName } from "@/app/utils/mainData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CarLeaps",
  description: "Your Favorite Cars Portal.",
};

export default async function CarsPage() {
  const cookiesData = await cookies();
  const region: string = cookiesData.get("region")?.value || MainRegionName;

  return redirect(`/${region}/cars/home`);
}
