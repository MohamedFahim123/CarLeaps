import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MainRegionName } from "./utils/mainData";

export const metadata: Metadata = {
  title: "Select Your Current Region",
  description:
    "Select your current region to get personalized recommendations and offers.",
};

export default async function MainHome() {
  const cookieStore = await cookies();
  const region: string | undefined = cookieStore.get("region")?.value;

  if (region) {
    return redirect(`/${region}`);
  }

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `region=${MainRegionName}; Path=/; Max-Age=${
      60 * 60 * 24 * 30
    }; Secure; HttpOnly`
  );

  return redirect(`/${MainRegionName}`);
}
