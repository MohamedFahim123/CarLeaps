import { Metadata } from "next";
import { cookies } from "next/headers";
import RegionPage from "./[region]/page";

export const metadata: Metadata = {
  title: "Select Your Current Region",
  description:
    "Select your current region to get personalized recommendations and offers.",
};

export default async function MainHome() {
  const regionFromCookie =
    (await cookies()).get("region")?.value || "default-region";

  return (
    <RegionPage
      params={Promise.resolve({ region: "some-region" })}
      regionFromCookie={regionFromCookie}
    />
  );
}
