import { redirect } from "next/navigation";
import { MainRegionName } from "../utils/mainData";

export default async function RegionPage({
  params,
}: {
  params: { region?: string | undefined };
}) {
  const regionFromUrl = params?.region?.toLowerCase();

  const finalRegion = regionFromUrl || MainRegionName;

  return redirect(`/${finalRegion}/cars/home`);
}
