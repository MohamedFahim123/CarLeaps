import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MainRegionName } from "../utils/mainData";

export default async function RegionPage({
  params,
}: {
  params: { region?: string };
}) {
  const regionFromUrl = params?.region?.toLowerCase();
  const regionFromCookie =
    (await cookies()).get("region")?.value?.toLowerCase() || MainRegionName;

  const finalRegion = regionFromUrl || regionFromCookie;

  if (regionFromCookie !== finalRegion) {
    (await cookies()).set("region", finalRegion, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: true,
    });
  }

  redirect(`/${finalRegion}/cars/home`);
}