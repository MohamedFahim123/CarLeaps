import { MainRegionName } from "@/app/utils/mainData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login To Valid Cars",
};

export default async function AuthPage() {
  const cookiesData = await cookies();
  const region: string = cookiesData.get("region")?.value || MainRegionName;

  return redirect(`/${region}/auth/login`);
}
