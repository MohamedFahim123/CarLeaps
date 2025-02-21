import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MainRegionName } from "../utils/mainData";

export default async function RegionPage({
  params,
}: {
  params: { region?: string };
}) {
  const cookieStore = await cookies();
  const regionFromUrl = params?.region?.toLowerCase();
  const regionFromCookie =
    cookieStore.get("region")?.value?.toLowerCase() || MainRegionName;

  const finalRegion = regionFromUrl || regionFromCookie;

  redirect(`/${finalRegion}/cars/home`);
}
